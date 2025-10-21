import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreatePostulationDto {
  @IsOptional()
  @IsNumberString()
  idPetition?: string;

  @IsOptional()
  @IsNumberString()
  idProvider?: string;

  @IsOptional()
  @IsBoolean()
  winner?: boolean;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  proposal?: string;

  @IsOptional()
  @IsNumberString()
  cost?: string;

  @IsOptional()
  @IsInt()
  idState?: number;

  @IsOptional()
  @IsString()
  @Length(1, 45)
  current?: string;

  @IsOptional()
  @IsNumberString()
  idUserCreate?: string;

  @IsOptional()
  @IsNumberString()
  idUserUpdate?: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  dateCreate?: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  dateUpdate?: Date;
}
