import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessionDto } from './create-profession.dto';
import { IsNumberString, IsOptional } from 'class-validator';

export class UpdateProfessionDto extends PartialType(CreateProfessionDto) {
  @IsOptional()
  @IsNumberString()
  idUserUpdate?: string | null;
}
