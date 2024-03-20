'use client'

import React, { useState } from 'react'
import { Button, Form, Input, Select, Typography, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CropandSoilDataSubmissionPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState([])

  const handleUpload = async options => {
    const { file } = options
    try {
      const url = await Api.Upload.upload(file)
      setFileList(fileList => [...fileList, { url: url, status: 'done' }])
      enqueueSnackbar('File uploaded successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('File upload failed', { variant: 'error' })
    }
  }

  const onFinish = async values => {
    try {
      await Api.Crop.createOneByUserId(userId, {
        name: values.cropName,
        optimalSoilType: values.optimalSoilType,
      })
      await Api.Soil.createOneByUserId(userId, {
        type: values.soilType,
        nutrientContent: values.nutrientContent,
        moistureLevel: values.moistureLevel,
      })
      enqueueSnackbar('Data submitted successfully', { variant: 'success' })
      form.resetFields()
      setFileList([])
    } catch (error) {
      enqueueSnackbar('Data submission failed', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Title level={2}>Crop and Soil Data Submission</Title>
        <Text>
          Submit your crop and soil data for analysis to get personalized
          recommendations.
        </Text>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ marginTop: '20px' }}
        >
          <Form.Item
            name="cropName"
            label="Crop Name"
            rules={[{ required: true, message: 'Please input the crop name!' }]}
          >
            <Input placeholder="Enter crop name" />
          </Form.Item>
          <Form.Item
            name="optimalSoilType"
            label="Optimal Soil Type"
            rules={[
              {
                required: true,
                message: 'Please select the optimal soil type!',
              },
            ]}
          >
            <Select placeholder="Select a soil type">
              <Option value="loamy">Loamy</Option>
              <Option value="clayey">Clayey</Option>
              <Option value="sandy">Sandy</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="soilType"
            label="Soil Type"
            rules={[{ required: true, message: 'Please input the soil type!' }]}
          >
            <Input placeholder="Enter soil type" />
          </Form.Item>
          <Form.Item
            name="nutrientContent"
            label="Nutrient Content"
            rules={[
              { required: true, message: 'Please input the nutrient content!' },
            ]}
          >
            <Input placeholder="Enter nutrient content" />
          </Form.Item>
          <Form.Item
            name="moistureLevel"
            label="Moisture Level"
            rules={[
              { required: true, message: 'Please input the moisture level!' },
            ]}
          >
            <Input placeholder="Enter moisture level" />
          </Form.Item>
          <Form.Item label="Upload Soil Analysis Report">
            <Upload
              fileList={fileList}
              customRequest={handleUpload}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  )
}
