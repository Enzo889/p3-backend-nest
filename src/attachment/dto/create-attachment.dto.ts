import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAttachmentDto {
  @IsNumber()
  @IsOptional()
  @IsInt()
  idPetition?: number | null; // id_petition

  @IsNumber()
  @IsOptional()
  @IsInt()
  idPortfolio?: number | null; // id_portfolio

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string; // name

  @IsString()
  @IsOptional()
  @MaxLength(255)
  path?: string | null; // path
}
