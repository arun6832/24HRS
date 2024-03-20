import { User } from '../user'

import { OrderDetail } from '../orderDetail'

import { Review } from '../review'

export class Product {
  id: string

  name?: string

  description?: string

  category?: string

  price?: number

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  orderDetails?: OrderDetail[]

  reviews?: Review[]
}
