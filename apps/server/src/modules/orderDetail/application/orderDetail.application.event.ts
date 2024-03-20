export namespace OrderDetailApplicationEvent {
  export namespace OrderDetailCreated {
    export const key = 'orderDetail.application.orderDetail.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
