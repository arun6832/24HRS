'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Card, Row, Col, Space } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AnnouncementsPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const announcementsFound = await Api.Announcement.findMany()
        setAnnouncements(announcementsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch announcements', { variant: 'error' })
      }
    }

    fetchAnnouncements()
  }, [])

  return (
    <PageLayout layout="full-width">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Latest Farming Announcements</Title>
        <Text>
          Stay updated with the latest updates, news, and important notices
          relevant to farming.
        </Text>
        <Row gutter={[16, 16]} justify="center">
          {announcements?.map(announcement => (
            <Col key={announcement.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={announcement.title}
                bordered={false}
                hoverable
                actions={[
                  <CalendarOutlined key="calendar" />,
                  <Text key="date">
                    {dayjs(announcement.date).format('MMM D, YYYY')}
                  </Text>,
                ]}
              >
                <Text>{announcement.content}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
    </PageLayout>
  )
}
