import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Announcement } from './announcement.model'

export class AnnouncementApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Announcement>,
  ): Promise<Announcement[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/announcements${buildOptions}`)
  }

  static findOne(
    announcementId: string,
    queryOptions?: ApiHelper.QueryOptions<Announcement>,
  ): Promise<Announcement> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/announcements/${announcementId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Announcement>): Promise<Announcement> {
    return HttpService.api.post(`/v1/announcements`, values)
  }

  static updateOne(
    announcementId: string,
    values: Partial<Announcement>,
  ): Promise<Announcement> {
    return HttpService.api.patch(`/v1/announcements/${announcementId}`, values)
  }

  static deleteOne(announcementId: string): Promise<void> {
    return HttpService.api.delete(`/v1/announcements/${announcementId}`)
  }
}
