'use client'

import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Typography } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CropRotationSuggestionsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [crops, setCrops] = useState([])
  const [soils, setSoils] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cropsData = await Api.Crop.findManyByUserId(userId, {
          includes: ['user'],
        })
        const soilsData = await Api.Soil.findManyByUserId(userId, {
          includes: ['user'],
        })
        setCrops(cropsData)
        setSoils(soilsData)
      } catch (error) {
        console.error('Failed to fetch data:', error)
        enqueueSnackbar('Failed to fetch data', { variant: 'error' })
      }
    }

    if (userId) {
      fetchData()
    }
  }, [userId])

  return (
    <PageLayout layout="full-width">
      <Row justify="center" style={{ margin: '20px 0' }}>
        <Col span={24}>
          <Title level={2} style={{ textAlign: 'center' }}>
            Crop Rotation Suggestions
          </Title>
          <Text style={{ display: 'block', textAlign: 'center' }}>
            Optimize your soil health and crop yield with personalized crop
            rotation suggestions.
          </Text>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center">
        {crops?.map((crop, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={crop.name}
              bordered={false}
              actions={[
                <Button
                  type="primary"
                  onClick={() => router.push('/suggestions/crop-production')}
                  icon={<SmileOutlined />}
                >
                  View Suggestions
                </Button>,
              ]}
            >
              <Text>Optimal Soil Type: {crop.optimalSoilType}</Text>
              <br />
              <Text>
                Date Created: {dayjs(crop.dateCreated).format('DD/MM/YYYY')}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={() => router.push('/submit-data')}>
            Submit New Data
          </Button>
        </Col>
      </Row>
    </PageLayout>
  )
}
