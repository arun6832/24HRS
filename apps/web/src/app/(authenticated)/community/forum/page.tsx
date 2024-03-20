'use client'

import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Typography,
  Modal,
  Form,
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

export default function CommunityForumPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [posts, setPosts] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentPost, setCurrentPost] = useState(null)
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchPosts = async () => {
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

  const showModal = (post = null) => {
    setCurrentPost(post)
    setIsModalVisible(true)
    if (post) {
      form.setFieldsValue(post)
    }
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      if (currentPost) {
        await Api.PostData.updateOne(currentPost.id, { ...values, userId })
        enqueueSnackbar('Post updated successfully', { variant: 'success' })
      } else {
        await Api.PostData.createOneByUserId(userId, values)
        enqueueSnackbar('Post created successfully', { variant: 'success' })
      }
      setIsModalVisible(false)
      form.resetFields()
      setCurrentPost(null)
    } catch (error) {
      enqueueSnackbar('Operation failed', { variant: 'error' })
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
    setCurrentPost(null)
  }

  const deletePost = async postId => {
    try {
      await Api.PostData.deleteOne(postId)
      enqueueSnackbar('Post deleted successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to delete post', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Community Forum</Title>
      <Text>
        Share knowledge and engage in discussions about farming practices.
      </Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        style={{ margin: '20px 0' }}
      >
        Add Post
      </Button>
      <Row gutter={[16, 16]}>
        {posts?.map(post => (
          <Col key={post.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={post.title}
              actions={[
                <EditOutlined key="edit" onClick={() => showModal(post)} />,
                <DeleteOutlined
                  key="delete"
                  onClick={() => deletePost(post.id)}
                />,
              ]}
            >
              <Text>{post.content}</Text>
              <Text
                type="secondary"
                style={{ display: 'block', marginTop: '10px' }}
              >
                {`Posted by ${post.user?.name} on ${dayjs(post.dateCreated).format('DD/MM/YYYY')}`}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title={currentPost ? 'Edit Post' : 'Add Post'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
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
        </Form>
      </Modal>
    </PageLayout>
  )
}
