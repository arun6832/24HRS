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
import { Soil, SoilDomainFacade } from '@server/modules/soil/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { SoilApplicationEvent } from './soil.application.event'
import { SoilCreateDto, SoilUpdateDto } from './soil.dto'

@Controller('/v1/soils')
export class SoilController {
  constructor(
    private eventService: EventService,
    private soilDomainFacade: SoilDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.soilDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: SoilCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.soilDomainFacade.create(body)

    await this.eventService.emit<SoilApplicationEvent.SoilCreated.Payload>(
      SoilApplicationEvent.SoilCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:soilId')
  async findOne(@Param('soilId') soilId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.soilDomainFacade.findOneByIdOrFail(
      soilId,
      queryOptions,
    )

    return item
  }

  @Patch('/:soilId')
  async update(@Param('soilId') soilId: string, @Body() body: SoilUpdateDto) {
    const item = await this.soilDomainFacade.findOneByIdOrFail(soilId)

    const itemUpdated = await this.soilDomainFacade.update(
      item,
      body as Partial<Soil>,
    )
    return itemUpdated
  }

  @Delete('/:soilId')
  async delete(@Param('soilId') soilId: string) {
    const item = await this.soilDomainFacade.findOneByIdOrFail(soilId)

    await this.soilDomainFacade.delete(item)

    return item
  }
}
