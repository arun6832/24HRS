import { Notification } from '../notification'

import { Crop } from '../crop'

import { Soil } from '../soil'

import { PostData } from '../postData'

import { Product } from '../product'

import { Order } from '../order'

import { Review } from '../review'

import { Collaboration } from '../collaboration'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email: string
  status: UserStatus
  name: string
  pictureUrl: string
  password: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  crops?: Crop[]

  soils?: Soil[]

  posts?: PostData[]

  products?: Product[]

  orders?: Order[]

  reviews?: Review[]

  collaborationsAsUserIdInitiator?: Collaboration[]

  collaborationsAsUserIdCollaborator?: Collaboration[]
}
