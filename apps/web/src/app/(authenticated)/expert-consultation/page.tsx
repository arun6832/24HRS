'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Row, Col, Card, Avatar, Space, Button } from 'antd'
import {
  QuestionCircleOutlined,
  MessageOutlined,
  TeamOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router' // Updated import for useRouter
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ExpertConsultationPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [experts, setExperts] = useState([])

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('You must be logged in to view this page', {
        variant: 'error',
      })
      // Removed the redirection to the non-existent login page
      return
    }

    const fetchExperts = async () => {
      try {
        const expertsFound = await Api.User.findMany({
          includes: ['posts', 'reviews'],
        })
        setExperts(expertsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch experts', { variant: 'error' })
      }
    }

    fetchExperts()
  }, [userId, router])

  return (
    <PageLayout layout="full-width">
      <Title level={2}>
        <QuestionCircleOutlined /> Expert Consultation
      </Title>
      <Paragraph>
        Get personalized advice from our farming experts on crop selection,
        farming practices, and more.
      </Paragraph>
      <Row gutter={[16, 16]} justify="center">
        {experts?.map(expert => (
          <Col xs={24} sm={12} md={8} lg={6} key={expert.id}>
            <Card
              actions={[
                <Button
                  type="link"
                  icon={<MessageOutlined />}
                  onClick={() =>
                    router.push(`/expert-consultation/${expert.id}`)
                  }
                >
                  Consult
                </Button>,
                // Updated the path to a valid one for collaboration
                <Button
                  type="link"
                  icon={<TeamOutlined />}
                  onClick={() => router.push(`/collaboration`)}
                >
                  Collaborate
                </Button>,
              ]}
            >
              <Card.Meta
                avatar={<Avatar src={expert.pictureUrl || undefined} />}
                title={expert.name}
                description={
                  <Space direction="vertical">
                    <Text>Posts: {expert.posts?.length}</Text>
                    <Text>Reviews: {expert.reviews?.length}</Text>
                    <Text>
                      Joined: {dayjs(expert.dateCreated).format('DD MMM YYYY')}
                    </Text>
                  </Space>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}
