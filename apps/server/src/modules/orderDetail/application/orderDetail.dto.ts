import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class OrderDetailCreateDto {
  @IsNumber()
  @IsOptional()
  quantity?: number

  @IsNumber()
  @IsOptional()
  price?: number

  @IsString()
  @IsOptional()
  orderId?: string

  @IsString()
  @IsOptional()
  productId?: string

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

export class OrderDetailUpdateDto {
  @IsNumber()
  @IsOptional()
  quantity?: number

  @IsNumber()
  @IsOptional()
  price?: number

  @IsString()
  @IsOptional()
  orderId?: string

  @IsString()
  @IsOptional()
  productId?: string

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
