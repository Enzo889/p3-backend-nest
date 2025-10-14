import {
  IsOptional,
  IsString,
  IsEmail,
  IsInt,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  lastName?: string;

  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsString()
  @MaxLength(255)
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsInt()
  group?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  token?: string;

  @IsOptional()
  dateToken?: Date;

  @IsOptional()
  @IsInt()
  idUserCreate?: number;

  @IsOptional()
  @IsInt()
  idUserUpdate?: number;

  @IsOptional()
  enabled?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(55)
  username?: string;

  @IsOptional()
  idProfile?: string;
}
