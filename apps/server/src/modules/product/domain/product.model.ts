import { ColumnNumeric } from '@server/core/database'
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

import { User } from '../../../modules/user/domain'

import { OrderDetail } from '../../../modules/orderDetail/domain'

import { Review } from '../../../modules/review/domain'

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  description?: string

  @Column({ nullable: true })
  category?: string

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  price?: number

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.products)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => OrderDetail, child => child.product)
  orderDetails?: OrderDetail[]

  @OneToMany(() => Review, child => child.product)
  reviews?: Review[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
