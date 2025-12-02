import {
  IsOptional,
  IsString,
  MaxLength,
  IsNumberString,
} from 'class-validator';

export class CreateProfessionDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string | null;

  @IsOptional()
  @IsNumberString() // porque viene como bigint → string
  idCategory?: string | null;

  @IsOptional()
  @IsNumberString()
  idUserCreate?: string | null;
}
