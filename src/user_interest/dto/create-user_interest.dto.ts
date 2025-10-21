import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserInterestDto {
  @IsInt()
  @IsNotEmpty()
  idUser: number;

  @IsInt()
  @IsNotEmpty()
  idCategory: number;
}
