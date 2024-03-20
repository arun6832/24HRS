import { User } from '../user'

export class Crop {
  id: string

  name?: string

  optimalSoilType?: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
