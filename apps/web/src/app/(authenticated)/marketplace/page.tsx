'use client'

import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Typography, Input, Select, Rate } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Search } = Input
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function MarketplacePage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id

  const [products, setProducts] = useState<Model.Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  )

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsFound = await Api.Product.findMany({
          includes: ['user', 'reviews'],
        })
        setProducts(productsFound)
        const uniqueCategories = Array.from(
          new Set(productsFound.map(product => product.category)),
        ).filter(Boolean)
        setCategories(uniqueCategories as string[])
      } catch (error) {
        enqueueSnackbar('Failed to fetch products', { variant: 'error' })
      }
    }

    fetchProducts()
  }, [])

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
  }

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Marketplace</Title>
      <Text>
        Welcome to Farmkit Marketplace. Buy and sell agricultural products,
        tools, and equipment.
      </Text>
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Search
            placeholder="Search products..."
            onSearch={value => console.log(value)}
            enterButton
          />
        </Col>
        <Col span={24}>
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Select a category"
            optionFilterProp="children"
            onChange={handleCategoryChange}
            filterOption={(input, option) =>
              option?.children
                ?.toString()
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {categories.map(category => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </Col>
        {filteredProducts.map(product => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <Card
              hoverable
              cover={
                <img
                  alt={product.name}
                  src={product.user?.pictureUrl || '/placeholder.png'}
                />
              }
              actions={[
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  onClick={() =>
                    enqueueSnackbar('Added to cart', { variant: 'success' })
                  }
                >
                  Add to Cart
                </Button>,
              ]}
            >
              <Card.Meta
                title={product.name}
                description={product.description}
              />
              <Rate
                disabled
                defaultValue={
                  product.reviews?.reduce(
                    (acc, review) => acc + (review.rating || 0),
                    0,
                  ) / product.reviews?.length || 0
                }
              />
              <Text strong style={{ display: 'block', marginTop: '10px' }}>
                ${product.price}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}
