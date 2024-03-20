import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Crop } from './crop.model'

export class CropApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Crop>,
  ): Promise<Crop[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/crops${buildOptions}`)
  }

  static findOne(
    cropId: string,
    queryOptions?: ApiHelper.QueryOptions<Crop>,
  ): Promise<Crop> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/crops/${cropId}${buildOptions}`)
  }

  static createOne(values: Partial<Crop>): Promise<Crop> {
    return HttpService.api.post(`/v1/crops`, values)
  }

  static updateOne(cropId: string, values: Partial<Crop>): Promise<Crop> {
    return HttpService.api.patch(`/v1/crops/${cropId}`, values)
  }

  static deleteOne(cropId: string): Promise<void> {
    return HttpService.api.delete(`/v1/crops/${cropId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Crop>,
  ): Promise<Crop[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/users/user/${userId}/crops${buildOptions}`)
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Crop>,
  ): Promise<Crop> {
    return HttpService.api.post(`/v1/users/user/${userId}/crops`, values)
  }
}
