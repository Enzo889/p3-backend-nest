import {
  IsInt,
  IsOptional,
  IsString,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class CreatePetitionDto {
  @IsOptional()
  @IsInt()
  idTypePetition?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  dateSince?: string;

  @IsOptional()
  @IsDateString()
  dateUntil?: string;

  @IsOptional()
  @IsInt()
  idUserCreate?: number;

  @IsOptional()
  @IsInt()
  idUserUpdate?: number;

  @IsOptional()
  @IsInt()
  idState?: number;

  @IsNotEmpty()
  @IsInt()
  @IsOptional()
  idCustomer?: number;

  @IsNotEmpty()
  @IsInt()
  @IsOptional()
  idCategory?: number;
}
