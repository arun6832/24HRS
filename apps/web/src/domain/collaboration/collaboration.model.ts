import { User } from '../user'

export class Collaboration {
  id: string

  topic?: string

  description?: string

  userIdInitiatorId: string

  userIdInitiator?: User

  userIdCollaboratorId: string

  userIdCollaborator?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
