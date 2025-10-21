import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateNotificationDto {
  @IsOptional()
  @IsInt()
  idProvider?: number;

  @IsOptional()
  @IsInt()
  idCustomer?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  type?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsBoolean()
  viewed?: boolean;

  @IsOptional()
  @IsInt()
  idUserUpdate?: number;

  @IsOptional()
  @IsInt()
  idUserCreate?: number;

  @IsOptional()
  @Type(() => Date)
  dateUpdate?: Date;

  @IsOptional()
  @Type(() => Date)
  dateCreate?: Date;

  @IsOptional()
  @IsBoolean()
  deleted?: boolean;
}
