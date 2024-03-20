import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { OrderDetailDomainModule } from '../domain'
import { OrderDetailController } from './orderDetail.controller'

import { OrderDomainModule } from '../../../modules/order/domain'

import { OrderDetailByOrderController } from './orderDetailByOrder.controller'

import { ProductDomainModule } from '../../../modules/product/domain'

import { OrderDetailByProductController } from './orderDetailByProduct.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    OrderDetailDomainModule,

    OrderDomainModule,

    ProductDomainModule,
  ],
  controllers: [
    OrderDetailController,

    OrderDetailByOrderController,

    OrderDetailByProductController,
  ],
  providers: [],
})
export class OrderDetailApplicationModule {}
