import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { OrderDetailDomainFacade } from '@server/modules/orderDetail/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { OrderDetailApplicationEvent } from './orderDetail.application.event'
import { OrderDetailCreateDto } from './orderDetail.dto'

import { OrderDomainFacade } from '../../order/domain'

@Controller('/v1/orders')
export class OrderDetailByOrderController {
  constructor(
    private orderDomainFacade: OrderDomainFacade,

    private orderDetailDomainFacade: OrderDetailDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/order/:orderId/orderDetails')
  async findManyOrderId(
    @Param('orderId') orderId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.orderDomainFacade.findOneByIdOrFail(orderId)

    const items = await this.orderDetailDomainFacade.findManyByOrder(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/order/:orderId/orderDetails')
  async createByOrderId(
    @Param('orderId') orderId: string,
    @Body() body: OrderDetailCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, orderId }

    const item = await this.orderDetailDomainFacade.create(valuesUpdated)

    await this.eventService.emit<OrderDetailApplicationEvent.OrderDetailCreated.Payload>(
      OrderDetailApplicationEvent.OrderDetailCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
