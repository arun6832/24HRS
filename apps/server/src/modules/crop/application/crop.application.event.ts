export namespace CropApplicationEvent {
  export namespace CropCreated {
    export const key = 'crop.application.crop.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
