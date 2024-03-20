import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { CropApi } from './crop/crop.api'

import { SoilApi } from './soil/soil.api'

import { PostDataApi } from './postData/postData.api'

import { ProductApi } from './product/product.api'

import { OrderApi } from './order/order.api'

import { OrderDetailApi } from './orderDetail/orderDetail.api'

import { ReviewApi } from './review/review.api'

import { AnnouncementApi } from './announcement/announcement.api'

import { CollaborationApi } from './collaboration/collaboration.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Crop extends CropApi {}

  export class Soil extends SoilApi {}

  export class PostData extends PostDataApi {}

  export class Product extends ProductApi {}

  export class Order extends OrderApi {}

  export class OrderDetail extends OrderDetailApi {}

  export class Review extends ReviewApi {}

  export class Announcement extends AnnouncementApi {}

  export class Collaboration extends CollaborationApi {}
}
