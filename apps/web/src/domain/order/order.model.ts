import { User } from '../user'

import { OrderDetail } from '../orderDetail'

export class Order {
  id: string

  date?: string

  totalPrice?: number

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  orderDetails?: OrderDetail[]
}
