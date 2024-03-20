import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ProductDomainModule } from '../domain'
import { ProductController } from './product.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { ProductByUserController } from './productByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, ProductDomainModule, UserDomainModule],
  controllers: [ProductController, ProductByUserController],
  providers: [],
})
export class ProductApplicationModule {}
