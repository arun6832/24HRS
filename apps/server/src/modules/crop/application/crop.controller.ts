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
import { Crop, CropDomainFacade } from '@server/modules/crop/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { CropApplicationEvent } from './crop.application.event'
import { CropCreateDto, CropUpdateDto } from './crop.dto'

@Controller('/v1/crops')
export class CropController {
  constructor(
    private eventService: EventService,
    private cropDomainFacade: CropDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.cropDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: CropCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.cropDomainFacade.create(body)

    await this.eventService.emit<CropApplicationEvent.CropCreated.Payload>(
      CropApplicationEvent.CropCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:cropId')
  async findOne(@Param('cropId') cropId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.cropDomainFacade.findOneByIdOrFail(
      cropId,
      queryOptions,
    )

    return item
  }

  @Patch('/:cropId')
  async update(@Param('cropId') cropId: string, @Body() body: CropUpdateDto) {
    const item = await this.cropDomainFacade.findOneByIdOrFail(cropId)

    const itemUpdated = await this.cropDomainFacade.update(
      item,
      body as Partial<Crop>,
    )
    return itemUpdated
  }

  @Delete('/:cropId')
  async delete(@Param('cropId') cropId: string) {
    const item = await this.cropDomainFacade.findOneByIdOrFail(cropId)

    await this.cropDomainFacade.delete(item)

    return item
  }
}
