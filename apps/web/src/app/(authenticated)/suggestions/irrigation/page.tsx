'use client'

import React, { useEffect, useState } from 'react'
import { Button, Form, Select, Typography, Row, Col, Card } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function IrrigationSuggestionsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [crops, setCrops] = useState([])
  const [soils, setSoils] = useState([])
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userCrops = await Api.Crop.findManyByUserId(userId, {
          includes: ['user'],
        })
        const userSoils = await Api.Soil.findManyByUserId(userId, {
          includes: ['user'],
        })
        setCrops(userCrops)
        setSoils(userSoils)
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
      // Here you would call the API to get irrigation suggestions based on selected crop and soil
      // This is just a placeholder as the actual API call depends on the backend implementation
      enqueueSnackbar('Irrigation suggestions fetched successfully.', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar(
        'Failed to fetch irrigation suggestions. Please try again.',
        { variant: 'error' },
      )
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col xs={24} md={12}>
          <Card bordered={false}>
            <Title level={2}>Irrigation Suggestions</Title>
            <Text>
              Get customized irrigation practices suggestions based on your crop
              and soil data.
            </Text>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              style={{ marginTop: '20px' }}
            >
              <Form.Item
                name="crop"
                label="Select Crop"
                rules={[{ required: true, message: 'Please select a crop!' }]}
              >
                <Select
                  placeholder="Select a crop"
                  suffixIcon={<QuestionCircleOutlined />}
                >
                  {crops?.map(crop => (
                    <Option key={crop.id} value={crop.id}>
                      {crop.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="soil"
                label="Select Soil"
                rules={[{ required: true, message: 'Please select a soil!' }]}
              >
                <Select
                  placeholder="Select a soil"
                  suffixIcon={<QuestionCircleOutlined />}
                >
                  {soils?.map(soil => (
                    <Option key={soil.id} value={soil.id}>
                      {soil.type}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
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
