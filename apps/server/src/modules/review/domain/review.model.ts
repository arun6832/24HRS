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

import { Product } from '../../../modules/product/domain'

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  rating?: number

  @Column({ nullable: true })
  comment?: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.reviews)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({})
  productId: string

  @ManyToOne(() => Product, parent => parent.reviews)
  @JoinColumn({ name: 'productId' })
  product?: Product

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
