import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { SoilDomainModule } from '../domain'
import { SoilController } from './soil.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { SoilByUserController } from './soilByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, SoilDomainModule, UserDomainModule],
  controllers: [SoilController, SoilByUserController],
  providers: [],
})
export class SoilApplicationModule {}
