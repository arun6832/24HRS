import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Soil } from './soil.model'

export class SoilApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Soil>,
  ): Promise<Soil[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/soils${buildOptions}`)
  }

  static findOne(
    soilId: string,
    queryOptions?: ApiHelper.QueryOptions<Soil>,
  ): Promise<Soil> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/soils/${soilId}${buildOptions}`)
  }

  static createOne(values: Partial<Soil>): Promise<Soil> {
    return HttpService.api.post(`/v1/soils`, values)
  }

  static updateOne(soilId: string, values: Partial<Soil>): Promise<Soil> {
    return HttpService.api.patch(`/v1/soils/${soilId}`, values)
  }

  static deleteOne(soilId: string): Promise<void> {
    return HttpService.api.delete(`/v1/soils/${soilId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Soil>,
  ): Promise<Soil[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/users/user/${userId}/soils${buildOptions}`)
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Soil>,
  ): Promise<Soil> {
    return HttpService.api.post(`/v1/users/user/${userId}/soils`, values)
  }
}
