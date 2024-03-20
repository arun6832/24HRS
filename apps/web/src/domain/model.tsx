import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Crop as CropModel } from './crop/crop.model'

import { Soil as SoilModel } from './soil/soil.model'

import { PostData as PostDataModel } from './postData/postData.model'

import { Product as ProductModel } from './product/product.model'

import { Order as OrderModel } from './order/order.model'

import { OrderDetail as OrderDetailModel } from './orderDetail/orderDetail.model'

import { Review as ReviewModel } from './review/review.model'

import { Announcement as AnnouncementModel } from './announcement/announcement.model'

import { Collaboration as CollaborationModel } from './collaboration/collaboration.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Crop extends CropModel {}

  export class Soil extends SoilModel {}

  export class PostData extends PostDataModel {}

  export class Product extends ProductModel {}

  export class Order extends OrderModel {}

  export class OrderDetail extends OrderDetailModel {}

  export class Review extends ReviewModel {}

  export class Announcement extends AnnouncementModel {}

  export class Collaboration extends CollaborationModel {}
}
