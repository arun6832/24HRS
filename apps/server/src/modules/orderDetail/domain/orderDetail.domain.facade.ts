import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { OrderDetail } from './orderDetail.model'

import { Order } from '../../order/domain'

import { Product } from '../../product/domain'

@Injectable()
export class OrderDetailDomainFacade {
  constructor(
    @InjectRepository(OrderDetail)
    private repository: Repository<OrderDetail>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<OrderDetail>): Promise<OrderDetail> {
    return this.repository.save(values)
  }

  async update(
    item: OrderDetail,
    values: Partial<OrderDetail>,
  ): Promise<OrderDetail> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: OrderDetail): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<OrderDetail> = {},
  ): Promise<OrderDetail[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<OrderDetail> = {},
  ): Promise<OrderDetail> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByOrder(
    item: Order,
    queryOptions: RequestHelper.QueryOptions<OrderDetail> = {},
  ): Promise<OrderDetail[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('order')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        orderId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByProduct(
    item: Product,
    queryOptions: RequestHelper.QueryOptions<OrderDetail> = {},
  ): Promise<OrderDetail[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('product')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        productId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
