import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import {
  Collaboration,
  CollaborationDomainFacade,
} from '@server/modules/collaboration/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { CollaborationApplicationEvent } from './collaboration.application.event'
import {
  CollaborationCreateDto,
  CollaborationUpdateDto,
} from './collaboration.dto'

@Controller('/v1/collaborations')
export class CollaborationController {
  constructor(
    private eventService: EventService,
    private collaborationDomainFacade: CollaborationDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.collaborationDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: CollaborationCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.collaborationDomainFacade.create(body)

    await this.eventService.emit<CollaborationApplicationEvent.CollaborationCreated.Payload>(
      CollaborationApplicationEvent.CollaborationCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:collaborationId')
  async findOne(
    @Param('collaborationId') collaborationId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.collaborationDomainFacade.findOneByIdOrFail(
      collaborationId,
      queryOptions,
    )

    return item
  }

  @Patch('/:collaborationId')
  async update(
    @Param('collaborationId') collaborationId: string,
    @Body() body: CollaborationUpdateDto,
  ) {
    const item =
      await this.collaborationDomainFacade.findOneByIdOrFail(collaborationId)

    const itemUpdated = await this.collaborationDomainFacade.update(
      item,
      body as Partial<Collaboration>,
    )
    return itemUpdated
  }

  @Delete('/:collaborationId')
  async delete(@Param('collaborationId') collaborationId: string) {
    const item =
      await this.collaborationDomainFacade.findOneByIdOrFail(collaborationId)

    await this.collaborationDomainFacade.delete(item)

    return item
  }
}
