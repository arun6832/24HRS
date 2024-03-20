import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationCropSubscriber } from './subscribers/notification.crop.subscriber'

import { NotificationSoilSubscriber } from './subscribers/notification.soil.subscriber'

import { NotificationPostDataSubscriber } from './subscribers/notification.postData.subscriber'

import { NotificationProductSubscriber } from './subscribers/notification.product.subscriber'

import { NotificationOrderSubscriber } from './subscribers/notification.order.subscriber'

import { NotificationOrderDetailSubscriber } from './subscribers/notification.orderDetail.subscriber'

import { NotificationReviewSubscriber } from './subscribers/notification.review.subscriber'

import { NotificationAnnouncementSubscriber } from './subscribers/notification.announcement.subscriber'

import { NotificationCollaborationSubscriber } from './subscribers/notification.collaboration.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationCropSubscriber,

    NotificationSoilSubscriber,

    NotificationPostDataSubscriber,

    NotificationProductSubscriber,

    NotificationOrderSubscriber,

    NotificationOrderDetailSubscriber,

    NotificationReviewSubscriber,

    NotificationAnnouncementSubscriber,

    NotificationCollaborationSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
