import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { AnnouncementDomainFacade } from './announcement.domain.facade'
import { Announcement } from './announcement.model'

@Module({
  imports: [TypeOrmModule.forFeature([Announcement]), DatabaseHelperModule],
  providers: [AnnouncementDomainFacade, AnnouncementDomainFacade],
  exports: [AnnouncementDomainFacade],
})
export class AnnouncementDomainModule {}
