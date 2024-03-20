export namespace SoilApplicationEvent {
  export namespace SoilCreated {
    export const key = 'soil.application.soil.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
