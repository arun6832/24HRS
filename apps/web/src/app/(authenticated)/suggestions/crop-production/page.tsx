'use client'

import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select, Typography, Row, Col, Card } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CropSuggestionsPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [crops, setCrops] = useState([])
  const [soils, setSoils] = useState([])
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cropsFound = await Api.Crop.findManyByUserId(userId, {
          includes: ['user'],
        })
        const soilsFound = await Api.Soil.findManyByUserId(userId, {
          includes: ['user'],
        })
        setCrops(cropsFound)
        setSoils(soilsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch data. Please try again.', {
          variant: 'error',
        })
      }
    }

    fetchData()
  }, [userId])

  const handleSubmit = async values => {
    try {
      // Assuming there's a suggestion API or some logic to process the input values
      // For demonstration, just navigate to another page
      router.push('/suggestions/crop-production')
      enqueueSnackbar('Suggestions submitted successfully!', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Submission failed. Please try again.', {
        variant: 'error',
      })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col span={24}>
          <Title level={2} style={{ textAlign: 'center' }}>
            Crop Production Suggestions
          </Title>
          <Text
            style={{
              display: 'block',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            Provide your crop and soil data to get personalized crop production
            suggestions.
          </Text>
        </Col>
        <Col xs={24} sm={18} md={12} lg={10} xl={8}>
          <Card>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                name="crop"
                label="Select your crop"
                rules={[
                  { required: true, message: 'Please select your crop!' },
                ]}
              >
                <Select placeholder="Select a crop">
                  {crops?.map(crop => (
                    <Option key={crop.id} value={crop.id}>
                      {crop.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="soil"
                label="Select your soil type"
                rules={[
                  { required: true, message: 'Please select your soil type!' },
                ]}
              >
                <Select placeholder="Select a soil type">
                  {soils?.map(soil => (
                    <Option key={soil.id} value={soil.id}>
                      {soil.type}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<PlusCircleOutlined />}
                >
                  Get Suggestions
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
