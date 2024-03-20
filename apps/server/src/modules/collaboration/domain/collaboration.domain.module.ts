import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { CollaborationDomainFacade } from './collaboration.domain.facade'
import { Collaboration } from './collaboration.model'

@Module({
  imports: [TypeOrmModule.forFeature([Collaboration]), DatabaseHelperModule],
  providers: [CollaborationDomainFacade, CollaborationDomainFacade],
  exports: [CollaborationDomainFacade],
})
export class CollaborationDomainModule {}
