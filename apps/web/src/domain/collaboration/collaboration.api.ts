import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Collaboration } from './collaboration.model'

export class CollaborationApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Collaboration>,
  ): Promise<Collaboration[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/collaborations${buildOptions}`)
  }

  static findOne(
    collaborationId: string,
    queryOptions?: ApiHelper.QueryOptions<Collaboration>,
  ): Promise<Collaboration> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/collaborations/${collaborationId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Collaboration>): Promise<Collaboration> {
    return HttpService.api.post(`/v1/collaborations`, values)
  }

  static updateOne(
    collaborationId: string,
    values: Partial<Collaboration>,
  ): Promise<Collaboration> {
    return HttpService.api.patch(
      `/v1/collaborations/${collaborationId}`,
      values,
    )
  }

  static deleteOne(collaborationId: string): Promise<void> {
    return HttpService.api.delete(`/v1/collaborations/${collaborationId}`)
  }

  static findManyByUserIdInitiatorId(
    userIdInitiatorId: string,
    queryOptions?: ApiHelper.QueryOptions<Collaboration>,
  ): Promise<Collaboration[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/userIdInitiator/${userIdInitiatorId}/collaborations${buildOptions}`,
    )
  }

  static createOneByUserIdInitiatorId(
    userIdInitiatorId: string,
    values: Partial<Collaboration>,
  ): Promise<Collaboration> {
    return HttpService.api.post(
      `/v1/users/userIdInitiator/${userIdInitiatorId}/collaborations`,
      values,
    )
  }

  static findManyByUserIdCollaboratorId(
    userIdCollaboratorId: string,
    queryOptions?: ApiHelper.QueryOptions<Collaboration>,
  ): Promise<Collaboration[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/userIdCollaborator/${userIdCollaboratorId}/collaborations${buildOptions}`,
    )
  }

  static createOneByUserIdCollaboratorId(
    userIdCollaboratorId: string,
    values: Partial<Collaboration>,
  ): Promise<Collaboration> {
    return HttpService.api.post(
      `/v1/users/userIdCollaborator/${userIdCollaboratorId}/collaborations`,
      values,
    )
  }
}
