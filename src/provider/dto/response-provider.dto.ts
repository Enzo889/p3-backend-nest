import { Expose } from 'class-transformer';

export class ProviderResponseDto {
  @Expose()
  idProvider: number;

  @Expose()
  name: string;

  @Expose()
  address: string | null;

  @Expose()
  gpsLat: number | null;

  @Expose()
  gpsLong: number | null;

  @Expose()
  idTypeProvider: number | null;

  @Expose()
  idCategory: number | null;

  @Expose()
  idGradeProvider: number | null;

  @Expose()
  idProfession: number | null;

  @Expose()
  idUser: number | null;

  @Expose()
  dateCreate: Date | null;

  @Expose()
  dateUpdate: Date | null;

  @Expose()
  idUserCreate: string | null;

  @Expose()
  idUserUpdate: string | null;

  @Expose()
  idOffer: string | null;

  @Expose()
  userId: number | null;

  @Expose()
  gpsLon: number | null;

  @Expose()
  typeProviderId: number | null;

  @Expose()
  description: string | null;
}
