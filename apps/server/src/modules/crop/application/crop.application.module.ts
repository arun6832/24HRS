import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { CropDomainModule } from '../domain'
import { CropController } from './crop.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { CropByUserController } from './cropByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, CropDomainModule, UserDomainModule],
  controllers: [CropController, CropByUserController],
  providers: [],
})
export class CropApplicationModule {}
