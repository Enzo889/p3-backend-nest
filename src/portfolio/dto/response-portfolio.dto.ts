import { Expose } from 'class-transformer';

export class PortfolioResponseDto {
  @Expose()
  idPortfolio: number;

  @Expose()
  name: string | null;

  @Expose()
  description: string | null;

  @Expose()
  idProvider: number;

  @Expose()
  idUserCreate: number | null;

  @Expose()
  idUserUpdate: number | null;

  @Expose()
  dateCreate: Date | null;

  @Expose()
  dateUpdate: Date | null;
}
