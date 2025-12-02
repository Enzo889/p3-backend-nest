import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsOptional } from 'class-validator';
import { CreateUserProfileDto } from './create-user_profile.dto';

export class UpdateUserProfileDto extends PartialType(CreateUserProfileDto) {
  @IsOptional()
  @IsInt()
  idUserUpdate?: number | null;
}
