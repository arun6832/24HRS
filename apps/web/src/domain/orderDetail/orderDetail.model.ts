import { Order } from '../order'

import { Product } from '../product'

export class OrderDetail {
  id: string

  quantity?: number

  price?: number

  orderId: string

  order?: Order

  productId: string

  product?: Product

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
