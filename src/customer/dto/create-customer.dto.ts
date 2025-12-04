import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsDateString,
  IsNumber,
  Length,
} from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ required: false, maxLength: 100 })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  name?: string;

  @ApiProperty({
    required: false,
    description: 'Fecha de nacimiento (YYYY-MM-DD)',
  })
  @IsOptional()
  @IsDateString()
  dateYear?: string;

  @ApiProperty({ required: false, maxLength: 20 })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  dni?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  @Length(1, 50)
  email?: string;

  @ApiProperty({ required: false, maxLength: 20 })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  phone?: string;

  @ApiProperty({ required: false, maxLength: 50 })
  @IsOptional()
  @IsString()
  adress?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  idGender?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  idCity?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  gpsLat?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  gpsLon?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  idUserCreate?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  idUserUpdate?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  dateCreate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  dateUpdate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  idUser?: number;

  @ApiProperty({ required: false, maxLength: 255 })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  address?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  userId?: number;
}
