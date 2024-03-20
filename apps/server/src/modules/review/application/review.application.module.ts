import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ReviewDomainModule } from '../domain'
import { ReviewController } from './review.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { ReviewByUserController } from './reviewByUser.controller'

import { ProductDomainModule } from '../../../modules/product/domain'

import { ReviewByProductController } from './reviewByProduct.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ReviewDomainModule,

    UserDomainModule,

    ProductDomainModule,
  ],
  controllers: [
    ReviewController,

    ReviewByUserController,

    ReviewByProductController,
  ],
  providers: [],
})
export class ReviewApplicationModule {}
