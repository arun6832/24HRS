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
export class Collaboration {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  topic?: string

  @Column({ nullable: true })
  description?: string

  @Column({})
  userIdInitiatorId: string

  @ManyToOne(() => User, parent => parent.collaborationsAsUserIdInitiator)
  @JoinColumn({ name: 'userIdInitiatorId' })
  userIdInitiator?: User

  @Column({})
  userIdCollaboratorId: string

  @ManyToOne(() => User, parent => parent.collaborationsAsUserIdCollaborator)
  @JoinColumn({ name: 'userIdCollaboratorId' })
  userIdCollaborator?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
