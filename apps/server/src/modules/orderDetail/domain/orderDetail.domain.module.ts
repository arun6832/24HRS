import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { OrderDetailDomainFacade } from './orderDetail.domain.facade'
import { OrderDetail } from './orderDetail.model'

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail]), DatabaseHelperModule],
  providers: [OrderDetailDomainFacade, OrderDetailDomainFacade],
  exports: [OrderDetailDomainFacade],
})
export class OrderDetailDomainModule {}
