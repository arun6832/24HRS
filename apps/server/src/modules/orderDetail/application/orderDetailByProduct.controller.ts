import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { OrderDetailDomainFacade } from '@server/modules/orderDetail/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { OrderDetailApplicationEvent } from './orderDetail.application.event'
import { OrderDetailCreateDto } from './orderDetail.dto'

import { ProductDomainFacade } from '../../product/domain'

@Controller('/v1/products')
export class OrderDetailByProductController {
  constructor(
    private productDomainFacade: ProductDomainFacade,

    private orderDetailDomainFacade: OrderDetailDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/product/:productId/orderDetails')
  async findManyProductId(
    @Param('productId') productId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.productDomainFacade.findOneByIdOrFail(productId)

    const items = await this.orderDetailDomainFacade.findManyByProduct(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/product/:productId/orderDetails')
  async createByProductId(
    @Param('productId') productId: string,
    @Body() body: OrderDetailCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, productId }

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
