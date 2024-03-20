import { User } from '../user'

export class PostData {
  id: string

  title?: string

  content?: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
