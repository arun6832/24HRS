import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { OrderDetail } from './orderDetail.model'

export class OrderDetailApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<OrderDetail>,
  ): Promise<OrderDetail[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/orderDetails${buildOptions}`)
  }

  static findOne(
    orderDetailId: string,
    queryOptions?: ApiHelper.QueryOptions<OrderDetail>,
  ): Promise<OrderDetail> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/orderDetails/${orderDetailId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<OrderDetail>): Promise<OrderDetail> {
    return HttpService.api.post(`/v1/orderDetails`, values)
  }

  static updateOne(
    orderDetailId: string,
    values: Partial<OrderDetail>,
  ): Promise<OrderDetail> {
    return HttpService.api.patch(`/v1/orderDetails/${orderDetailId}`, values)
  }

  static deleteOne(orderDetailId: string): Promise<void> {
    return HttpService.api.delete(`/v1/orderDetails/${orderDetailId}`)
  }

  static findManyByOrderId(
    orderId: string,
    queryOptions?: ApiHelper.QueryOptions<OrderDetail>,
  ): Promise<OrderDetail[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/orders/order/${orderId}/orderDetails${buildOptions}`,
    )
  }

  static createOneByOrderId(
    orderId: string,
    values: Partial<OrderDetail>,
  ): Promise<OrderDetail> {
    return HttpService.api.post(
      `/v1/orders/order/${orderId}/orderDetails`,
      values,
    )
  }

  static findManyByProductId(
    productId: string,
    queryOptions?: ApiHelper.QueryOptions<OrderDetail>,
  ): Promise<OrderDetail[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/products/product/${productId}/orderDetails${buildOptions}`,
    )
  }

  static createOneByProductId(
    productId: string,
    values: Partial<OrderDetail>,
  ): Promise<OrderDetail> {
    return HttpService.api.post(
      `/v1/products/product/${productId}/orderDetails`,
      values,
    )
  }
}
