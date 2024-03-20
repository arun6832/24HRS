import { User } from '../user'

export class Soil {
  id: string

  type?: string

  nutrientContent?: string

  moistureLevel?: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
