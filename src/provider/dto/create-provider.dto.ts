import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  IsNumber,
  IsNumberString,
} from 'class-validator';

export class CreateProviderDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string | null;

  @IsOptional()
  @IsNumber()
  gpsLat?: number | null;

  @IsOptional()
  @IsNumber()
  gpsLong?: number | null;

  @IsOptional()
  @IsInt()
  idTypeProvider?: number | null;

  @IsOptional()
  @IsInt()
  idCategory?: number | null;

  @IsOptional()
  @IsInt()
  idGradeProvider?: number | null;

  @IsOptional()
  @IsInt()
  idProfession?: number | null;

  @IsOptional()
  @IsInt()
  idUser?: number | null;

  @IsOptional()
  @IsNumberString()
  idUserCreate?: string | null;

  @IsOptional()
  @IsNumberString()
  idOffer?: string | null;

  @IsOptional()
  @IsInt()
  userId?: number | null;

  @IsOptional()
  @IsNumber()
  gpsLon?: number | null;

  @IsOptional()
  @IsInt()
  typeProviderId?: number | null;

  @IsOptional()
  @IsString()
  description?: string | null;
}
