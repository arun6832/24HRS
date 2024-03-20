import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CollaborationCreateDto {
  @IsString()
  @IsOptional()
  topic?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  userIdInitiatorId?: string

  @IsString()
  @IsOptional()
  userIdCollaboratorId?: string

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

export class CollaborationUpdateDto {
  @IsString()
  @IsOptional()
  topic?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  userIdInitiatorId?: string

  @IsString()
  @IsOptional()
  userIdCollaboratorId?: string

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
