import { User } from '../user'

import { Product } from '../product'

export class Review {
  id: string

  rating?: number

  comment?: string

  userId: string

  user?: User

  productId: string

  product?: Product

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
