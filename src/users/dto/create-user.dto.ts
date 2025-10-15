import {
  IsOptional,
  IsString,
  IsEmail,
  IsInt,
  MaxLength,
  MinLength,
  Max,
  Min,
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

  @IsOptional() // opcional si no siempre se envía el rol en el login
  @IsInt({ message: 'Group must be an integer value' })
  @Min(1, { message: 'Group must be at least 1' })
  @Max(5, { message: 'Group must be at most 5' })
  group?: number; // 1 = superadmin, 2 = admin, 3 = user.

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
