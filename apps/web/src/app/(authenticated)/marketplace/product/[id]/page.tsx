'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Card, Avatar, Rate, Row, Col, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ProductDetailsandReviewsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { enqueueSnackbar } = useSnackbar()
  const [product, setProduct] = useState<any>(null)
  const [reviews, setReviews] = useState<any[]>([])

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetails = await Api.Product.findOne(params.id, {
          includes: ['user', 'reviews.user'],
        })
        setProduct(productDetails)
        setReviews(productDetails.reviews || [])
      } catch (error) {
        enqueueSnackbar('Failed to fetch product details', { variant: 'error' })
      }
    }

    fetchProductDetails()
  }, [params.id])

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <Title level={2}>Product Details</Title>
        {product ? (
          <Card>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Space direction="vertical">
                  <Title level={4}>{product.name}</Title>
                  <Text>{product.description}</Text>
                  <Text strong>Price: ${product.price}</Text>
                  <Text type="secondary">Category: {product.category}</Text>
                  <Text type="secondary">
                    Seller: {product.user?.name || 'Unknown'}
                  </Text>
                  <Text type="secondary">
                    Date Listed:{' '}
                    {dayjs(product.dateCreated).format('DD/MM/YYYY')}
                  </Text>
                </Space>
              </Col>
            </Row>
          </Card>
        ) : (
          <Text>Loading...</Text>
        )}
        <Title level={3} style={{ marginTop: '20px' }}>
          Reviews
        </Title>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <Card key={review.id} style={{ marginBottom: '10px' }}>
              <Space direction="vertical">
                <Space>
                  <Avatar
                    icon={<UserOutlined />}
                    src={review.user?.pictureUrl}
                  />
                  <Text strong>{review.user?.name || 'Anonymous'}</Text>
                </Space>
                <Rate disabled defaultValue={review.rating} />
                <Text>{review.comment}</Text>
                <Text type="secondary">
                  {dayjs(review.dateCreated).format('DD/MM/YYYY')}
                </Text>
              </Space>
            </Card>
          ))
        ) : (
          <Text>No reviews yet.</Text>
        )}
      </div>
    </PageLayout>
  )
}
