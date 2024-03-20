export namespace AnnouncementApplicationEvent {
  export namespace AnnouncementCreated {
    export const key = 'announcement.application.announcement.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
