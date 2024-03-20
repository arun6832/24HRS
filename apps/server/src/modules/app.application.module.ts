import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { CropApplicationModule } from './crop/application'

import { SoilApplicationModule } from './soil/application'

import { PostDataApplicationModule } from './postData/application'

import { ProductApplicationModule } from './product/application'

import { OrderApplicationModule } from './order/application'

import { OrderDetailApplicationModule } from './orderDetail/application'

import { ReviewApplicationModule } from './review/application'

import { AnnouncementApplicationModule } from './announcement/application'

import { CollaborationApplicationModule } from './collaboration/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,

    CropApplicationModule,

    SoilApplicationModule,

    PostDataApplicationModule,

    ProductApplicationModule,

    OrderApplicationModule,

    OrderDetailApplicationModule,

    ReviewApplicationModule,

    AnnouncementApplicationModule,

    CollaborationApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
