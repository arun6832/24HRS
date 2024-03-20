import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { CropDomainFacade } from './crop.domain.facade'
import { Crop } from './crop.model'

@Module({
  imports: [TypeOrmModule.forFeature([Crop]), DatabaseHelperModule],
  providers: [CropDomainFacade, CropDomainFacade],
  exports: [CropDomainFacade],
})
export class CropDomainModule {}
