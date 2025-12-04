import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserProfileDto {
  @IsOptional()
  @IsEmail()
  @MaxLength(150)
  email?: string | null;

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean | null | number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  roleType?: string | null;

  @IsOptional()
  @IsInt()
  userId?: number | null;

  @IsOptional()
  @IsInt()
  idUserCreate?: number | null;
}
