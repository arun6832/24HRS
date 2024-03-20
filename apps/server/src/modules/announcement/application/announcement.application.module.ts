import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { AnnouncementDomainModule } from '../domain'
import { AnnouncementController } from './announcement.controller'

@Module({
  imports: [AuthenticationDomainModule, AnnouncementDomainModule],
  controllers: [AnnouncementController],
  providers: [],
})
export class AnnouncementApplicationModule {}
