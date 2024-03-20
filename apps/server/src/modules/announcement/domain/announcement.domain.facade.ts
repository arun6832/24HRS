import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Announcement } from './announcement.model'

@Injectable()
export class AnnouncementDomainFacade {
  constructor(
    @InjectRepository(Announcement)
    private repository: Repository<Announcement>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Announcement>): Promise<Announcement> {
    return this.repository.save(values)
  }

  async update(
    item: Announcement,
    values: Partial<Announcement>,
  ): Promise<Announcement> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Announcement): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Announcement> = {},
  ): Promise<Announcement[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Announcement> = {},
  ): Promise<Announcement> {
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
}
