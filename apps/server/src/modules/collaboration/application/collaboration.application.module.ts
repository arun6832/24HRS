import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { CollaborationDomainModule } from '../domain'
import { CollaborationController } from './collaboration.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { CollaborationByUserController } from './collaborationByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    CollaborationDomainModule,

    UserDomainModule,
  ],
  controllers: [CollaborationController, CollaborationByUserController],
  providers: [],
})
export class CollaborationApplicationModule {}
