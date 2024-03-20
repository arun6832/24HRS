import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Collaboration } from './collaboration.model'

import { User } from '../../user/domain'

@Injectable()
export class CollaborationDomainFacade {
  constructor(
    @InjectRepository(Collaboration)
    private repository: Repository<Collaboration>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Collaboration>): Promise<Collaboration> {
    return this.repository.save(values)
  }

  async update(
    item: Collaboration,
    values: Partial<Collaboration>,
  ): Promise<Collaboration> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Collaboration): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Collaboration> = {},
  ): Promise<Collaboration[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Collaboration> = {},
  ): Promise<Collaboration> {
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

  async findManyByUserIdInitiator(
    item: User,
    queryOptions: RequestHelper.QueryOptions<Collaboration> = {},
  ): Promise<Collaboration[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('userIdInitiator')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        userIdInitiatorId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByUserIdCollaborator(
    item: User,
    queryOptions: RequestHelper.QueryOptions<Collaboration> = {},
  ): Promise<Collaboration[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('userIdCollaborator')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        userIdCollaboratorId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
