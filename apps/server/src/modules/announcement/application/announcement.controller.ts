import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import {
  Announcement,
  AnnouncementDomainFacade,
} from '@server/modules/announcement/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { AnnouncementApplicationEvent } from './announcement.application.event'
import {
  AnnouncementCreateDto,
  AnnouncementUpdateDto,
} from './announcement.dto'

@Controller('/v1/announcements')
export class AnnouncementController {
  constructor(
    private eventService: EventService,
    private announcementDomainFacade: AnnouncementDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.announcementDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: AnnouncementCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.announcementDomainFacade.create(body)

    await this.eventService.emit<AnnouncementApplicationEvent.AnnouncementCreated.Payload>(
      AnnouncementApplicationEvent.AnnouncementCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:announcementId')
  async findOne(
    @Param('announcementId') announcementId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.announcementDomainFacade.findOneByIdOrFail(
      announcementId,
      queryOptions,
    )

    return item
  }

  @Patch('/:announcementId')
  async update(
    @Param('announcementId') announcementId: string,
    @Body() body: AnnouncementUpdateDto,
  ) {
    const item =
      await this.announcementDomainFacade.findOneByIdOrFail(announcementId)

    const itemUpdated = await this.announcementDomainFacade.update(
      item,
      body as Partial<Announcement>,
    )
    return itemUpdated
  }

  @Delete('/:announcementId')
  async delete(@Param('announcementId') announcementId: string) {
    const item =
      await this.announcementDomainFacade.findOneByIdOrFail(announcementId)

    await this.announcementDomainFacade.delete(item)

    return item
  }
}
