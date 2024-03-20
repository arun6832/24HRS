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
  OrderDetail,
  OrderDetailDomainFacade,
} from '@server/modules/orderDetail/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { OrderDetailApplicationEvent } from './orderDetail.application.event'
import { OrderDetailCreateDto, OrderDetailUpdateDto } from './orderDetail.dto'

@Controller('/v1/orderDetails')
export class OrderDetailController {
  constructor(
    private eventService: EventService,
    private orderDetailDomainFacade: OrderDetailDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.orderDetailDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: OrderDetailCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.orderDetailDomainFacade.create(body)

    await this.eventService.emit<OrderDetailApplicationEvent.OrderDetailCreated.Payload>(
      OrderDetailApplicationEvent.OrderDetailCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:orderDetailId')
  async findOne(
    @Param('orderDetailId') orderDetailId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.orderDetailDomainFacade.findOneByIdOrFail(
      orderDetailId,
      queryOptions,
    )

    return item
  }

  @Patch('/:orderDetailId')
  async update(
    @Param('orderDetailId') orderDetailId: string,
    @Body() body: OrderDetailUpdateDto,
  ) {
    const item =
      await this.orderDetailDomainFacade.findOneByIdOrFail(orderDetailId)

    const itemUpdated = await this.orderDetailDomainFacade.update(
      item,
      body as Partial<OrderDetail>,
    )
    return itemUpdated
  }

  @Delete('/:orderDetailId')
  async delete(@Param('orderDetailId') orderDetailId: string) {
    const item =
      await this.orderDetailDomainFacade.findOneByIdOrFail(orderDetailId)

    await this.orderDetailDomainFacade.delete(item)

    return item
  }
}
