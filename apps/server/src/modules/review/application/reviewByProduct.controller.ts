import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ReviewDomainFacade } from '@server/modules/review/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ReviewApplicationEvent } from './review.application.event'
import { ReviewCreateDto } from './review.dto'

import { ProductDomainFacade } from '../../product/domain'

@Controller('/v1/products')
export class ReviewByProductController {
  constructor(
    private productDomainFacade: ProductDomainFacade,

    private reviewDomainFacade: ReviewDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/product/:productId/reviews')
  async findManyProductId(
    @Param('productId') productId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.productDomainFacade.findOneByIdOrFail(productId)

    const items = await this.reviewDomainFacade.findManyByProduct(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/product/:productId/reviews')
  async createByProductId(
    @Param('productId') productId: string,
    @Body() body: ReviewCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, productId }

    const item = await this.reviewDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ReviewApplicationEvent.ReviewCreated.Payload>(
      ReviewApplicationEvent.ReviewCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
