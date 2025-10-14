import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(6, 255)
  password: string;

  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsOptional()
  @Length(1, 50)
  name?: string;
}
