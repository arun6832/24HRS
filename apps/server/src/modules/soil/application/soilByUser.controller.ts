import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { SoilDomainFacade } from '@server/modules/soil/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { SoilApplicationEvent } from './soil.application.event'
import { SoilCreateDto } from './soil.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class SoilByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private soilDomainFacade: SoilDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/soils')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.soilDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/soils')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: SoilCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.soilDomainFacade.create(valuesUpdated)

    await this.eventService.emit<SoilApplicationEvent.SoilCreated.Payload>(
      SoilApplicationEvent.SoilCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
