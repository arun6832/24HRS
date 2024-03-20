import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class SoilCreateDto {
  @IsString()
  @IsOptional()
  type?: string

  @IsString()
  @IsOptional()
  nutrientContent?: string

  @IsString()
  @IsOptional()
  moistureLevel?: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class SoilUpdateDto {
  @IsString()
  @IsOptional()
  type?: string

  @IsString()
  @IsOptional()
  nutrientContent?: string

  @IsString()
  @IsOptional()
  moistureLevel?: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
