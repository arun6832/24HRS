import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { CollaborationDomainFacade } from '@server/modules/collaboration/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { CollaborationApplicationEvent } from './collaboration.application.event'
import { CollaborationCreateDto } from './collaboration.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class CollaborationByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private collaborationDomainFacade: CollaborationDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/userIdInitiator/:userIdInitiatorId/collaborations')
  async findManyUserIdInitiatorId(
    @Param('userIdInitiatorId') userIdInitiatorId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.userDomainFacade.findOneByIdOrFail(userIdInitiatorId)

    const items =
      await this.collaborationDomainFacade.findManyByUserIdInitiator(
        parent,
        queryOptions,
      )

    return items
  }

  @Post('/userIdInitiator/:userIdInitiatorId/collaborations')
  async createByUserIdInitiatorId(
    @Param('userIdInitiatorId') userIdInitiatorId: string,
    @Body() body: CollaborationCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userIdInitiatorId }

    const item = await this.collaborationDomainFacade.create(valuesUpdated)

    await this.eventService.emit<CollaborationApplicationEvent.CollaborationCreated.Payload>(
      CollaborationApplicationEvent.CollaborationCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/userIdCollaborator/:userIdCollaboratorId/collaborations')
  async findManyUserIdCollaboratorId(
    @Param('userIdCollaboratorId') userIdCollaboratorId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.userDomainFacade.findOneByIdOrFail(userIdCollaboratorId)

    const items =
      await this.collaborationDomainFacade.findManyByUserIdCollaborator(
        parent,
        queryOptions,
      )

    return items
  }

  @Post('/userIdCollaborator/:userIdCollaboratorId/collaborations')
  async createByUserIdCollaboratorId(
    @Param('userIdCollaboratorId') userIdCollaboratorId: string,
    @Body() body: CollaborationCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userIdCollaboratorId }

    const item = await this.collaborationDomainFacade.create(valuesUpdated)

    await this.eventService.emit<CollaborationApplicationEvent.CollaborationCreated.Payload>(
      CollaborationApplicationEvent.CollaborationCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
