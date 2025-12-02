import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTypeProviderDto {
  @IsString()
  @MaxLength(70)
  type: string;

  @IsOptional()
  @IsBoolean()
  business?: boolean | null;

  @IsOptional()
  @IsBoolean()
  transport?: boolean | null;

  @IsInt()
  idUserCreate: number;

  @IsInt()
  idUserUpdate: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string | null;
}
