'use client'

import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Modal,
  Form,
  Input,
  Space,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CollaborationHubPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [posts, setPosts] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    async function fetchPosts() {
      try {
        const postDatasFound = await Api.PostData.findMany({
          includes: ['user'],
        })
        setPosts(postDatasFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch posts', { variant: 'error' })
      }
    }
    fetchPosts()
  }, [])

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleSubmit = async values => {
    try {
      await Api.PostData.createOneByUserId(userId, values)
      enqueueSnackbar('Post created successfully', { variant: 'success' })
      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      enqueueSnackbar('Failed to create post', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Collaboration Hub</Title>
      <Text>
        This is a central space for Farmkit users to collaborate on farming
        practices, share insights, and engage in discussions.
      </Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
        style={{ margin: '20px 0' }}
      >
        Create Post
      </Button>
      <Row gutter={[16, 16]}>
        {posts?.map(post => (
          <Col key={post.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={post.title}
              actions={[
                <EditOutlined key="edit" />,
                <DeleteOutlined key="delete" />,
              ]}
            >
              <Text>{post.content}</Text>
              <br />
              <Text type="secondary">
                {dayjs(post.dateCreated).format('DD MMM YYYY')}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title="Create Post"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please input the content!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
