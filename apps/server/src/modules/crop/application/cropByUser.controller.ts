import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { CropDomainFacade } from '@server/modules/crop/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { CropApplicationEvent } from './crop.application.event'
import { CropCreateDto } from './crop.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class CropByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private cropDomainFacade: CropDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/crops')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.cropDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/crops')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: CropCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.cropDomainFacade.create(valuesUpdated)

    await this.eventService.emit<CropApplicationEvent.CropCreated.Payload>(
      CropApplicationEvent.CropCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
