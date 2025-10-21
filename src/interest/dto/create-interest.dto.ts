import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsDate, IsPositive } from 'class-validator';

export class CreateInterestDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  idCustomer?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  idCategory?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  idUserCreate?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  idUserUpdate?: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateCreate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateUpdate?: Date;
}
