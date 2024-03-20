export namespace CollaborationApplicationEvent {
  export namespace CollaborationCreated {
    export const key = 'collaboration.application.collaboration.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
