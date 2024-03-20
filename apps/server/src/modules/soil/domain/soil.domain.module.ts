import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { SoilDomainFacade } from './soil.domain.facade'
import { Soil } from './soil.model'

@Module({
  imports: [TypeOrmModule.forFeature([Soil]), DatabaseHelperModule],
  providers: [SoilDomainFacade, SoilDomainFacade],
  exports: [SoilDomainFacade],
})
export class SoilDomainModule {}
