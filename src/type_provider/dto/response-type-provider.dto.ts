import { Expose } from 'class-transformer';

export class TypeProviderResponseDto {
  @Expose()
  idTypeProvider: number;

  @Expose()
  type: string;

  @Expose()
  business: boolean | null;

  @Expose()
  transport: boolean | null;

  @Expose()
  idUserCreate: number;

  @Expose()
  idUserUpdate: number;

  @Expose()
  dateCreate: Date;

  @Expose()
  dateUpdate: Date;

  @Expose()
  name: string | null;
}
