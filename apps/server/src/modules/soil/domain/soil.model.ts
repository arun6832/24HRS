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

@Entity()
export class Soil {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  type?: string

  @Column({ nullable: true })
  nutrientContent?: string

  @Column({ nullable: true })
  moistureLevel?: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.soils)
  @JoinColumn({ name: 'userId' })
  user?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
