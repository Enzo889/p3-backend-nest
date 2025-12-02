import { Expose } from 'class-transformer';

export class UserProfileResponseDto {
  @Expose()
  idProfile: number;

  @Expose()
  email: string | null;

  @Expose()
  isAdmin: boolean | null;

  @Expose()
  roleType: string | null;

  @Expose()
  userId: number | null;

  @Expose()
  idUserCreate: number | null;

  @Expose()
  idUserUpdate: number | null;

  @Expose()
  dateCreate: Date | null;

  @Expose()
  dateUpdate: Date | null;
}
