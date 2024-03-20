import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { CropDomainModule } from './crop/domain'

import { SoilDomainModule } from './soil/domain'

import { PostDataDomainModule } from './postData/domain'

import { ProductDomainModule } from './product/domain'

import { OrderDomainModule } from './order/domain'

import { OrderDetailDomainModule } from './orderDetail/domain'

import { ReviewDomainModule } from './review/domain'

import { AnnouncementDomainModule } from './announcement/domain'

import { CollaborationDomainModule } from './collaboration/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    CropDomainModule,

    SoilDomainModule,

    PostDataDomainModule,

    ProductDomainModule,

    OrderDomainModule,

    OrderDetailDomainModule,

    ReviewDomainModule,

    AnnouncementDomainModule,

    CollaborationDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
