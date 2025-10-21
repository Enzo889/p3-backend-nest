import { PartialType } from '@nestjs/mapped-types';
import { CreatePetitionDto } from './create-petition.dto';
import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class UpdatePetitionDto extends PartialType(CreatePetitionDto) {
  @IsOptional()
  @IsInt()
  idUserUpdate?: number;

  @IsOptional()
  @IsDateString()
  dateUpdate?: string;
}
