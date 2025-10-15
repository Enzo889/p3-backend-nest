import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(6, 255)
  password: string;

  @IsOptional() // opcional si no siempre se envía el rol en el login
  @IsInt({ message: 'Group must be an integer value' })
  @Min(1, { message: 'Group must be at least 1' })
  @Max(5, { message: 'Group must be at most 5' })
  group?: number; // 1 = superadmin, 2 = admin, 3 = user.
}
