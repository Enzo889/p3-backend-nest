import { PartialType } from '@nestjs/mapped-types';
import { CreateProviderDto } from './create-provider.dto';
import { IsOptional, IsNumberString } from 'class-validator';

export class UpdateProviderDto extends PartialType(CreateProviderDto) {
  @IsOptional()
  @IsNumberString()
  idUserUpdate?: string | null;
}
