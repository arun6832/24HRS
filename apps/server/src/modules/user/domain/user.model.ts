import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Notification } from '../../../modules/notification/domain'

import { Crop } from '../../../modules/crop/domain'

import { Soil } from '../../../modules/soil/domain'

import { PostData } from '../../../modules/postData/domain'

import { Product } from '../../../modules/product/domain'

import { Order } from '../../../modules/order/domain'

import { Review } from '../../../modules/review/domain'

import { Collaboration } from '../../../modules/collaboration/domain'

export enum UserStatus {
  VERIFIED = 'VERIFIED',
  CREATED = 'CREATED',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  name: string

  @Column({ nullable: true })
  pictureUrl?: string

  @Column({ select: false, nullable: true })
  password: string

  @Column({ enum: UserStatus, default: UserStatus.VERIFIED })
  status: UserStatus

  @OneToMany(() => Crop, child => child.user)
  crops?: Crop[]

  @OneToMany(() => Soil, child => child.user)
  soils?: Soil[]

  @OneToMany(() => PostData, child => child.user)
  posts?: PostData[]

  @OneToMany(() => Product, child => child.user)
  products?: Product[]

  @OneToMany(() => Order, child => child.user)
  orders?: Order[]

  @OneToMany(() => Review, child => child.user)
  reviews?: Review[]

  @OneToMany(() => Collaboration, child => child.userIdInitiator)
  collaborationsAsUserIdInitiator?: Collaboration[]

  @OneToMany(() => Collaboration, child => child.userIdCollaborator)
  collaborationsAsUserIdCollaborator?: Collaboration[]

  @OneToMany(() => Notification, notification => notification.user)
  notifications?: Notification[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
