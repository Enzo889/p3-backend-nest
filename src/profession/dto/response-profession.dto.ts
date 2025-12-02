import { Expose } from 'class-transformer';

export class ProfessionResponseDto {
  @Expose()
  idProfession: number;

  @Expose()
  name: string | null;

  @Expose()
  idCategory: string | null;

  @Expose()
  idUserCreate: string | null;

  @Expose()
  idUserUpdate: string | null;

  @Expose()
  dateCreate: Date;

  @Expose()
  dateUpdate: Date;
}
