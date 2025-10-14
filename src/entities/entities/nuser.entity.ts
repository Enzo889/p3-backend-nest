import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NProvider } from './nprovider.entity';
import { NOffers } from './noffers.entity';
import { NUserVerificationCode } from './nuserverificationcode.entity';
import { NTypeOffer } from './ntypeoffer.entity';
import { NCustomer } from './ncustomer.entity';
import { NRole } from './nrole.entity';

@Index('email', ['email'], { unique: true })
@Entity('n_user', { schema: 'ies9021_coco' })
export class NUser {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_user' })
  idUser: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('varchar', { name: 'lastname', nullable: true, length: 50 })
  lastname: string | null;

  @Column('varchar', { name: 'profile_image', nullable: true, length: 255 })
  profileImage: string | null;

  @Column('varchar', { name: 'email', unique: true, length: 100 })
  email: string;

  @Column('varchar', { name: 'password', length: 255 })
  password: string;

  @Column('tinyint', { name: 'enabled', width: 1, default: () => "'1'" })
  enabled: boolean;

  @Column('datetime', {
    name: 'date_create',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateCreate: Date | null;

  @Column('datetime', {
    name: 'date_update',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateUpdate: Date | null;

  @Column('datetime', { name: 'last_login', nullable: true })
  lastLogin: Date | null;

  @Column('tinyint', { name: 'is_superuser', width: 1, default: () => "'0'" })
  isSuperuser: boolean;

  @Column('datetime', { name: 'date_joined', nullable: true })
  dateJoined: Date | null;

  @Column('tinyint', { name: 'is_staff', width: 1, default: () => "'0'" })
  isStaff: boolean;

  @Column('tinyint', { name: 'is_active', width: 1, default: () => "'1'" })
  isActive: boolean;

  @OneToOne(() => NProvider, (nProvider) => nProvider.user)
  nProvider: NProvider;

  @OneToMany(() => NOffers, (nOffers) => nOffers.userCreate)
  nOffers: NOffers[];

  @OneToMany(() => NOffers, (nOffers) => nOffers.userUpdate)
  nOffers2: NOffers[];

  @OneToMany(
    () => NUserVerificationCode,
    (nUserVerificationCode) => nUserVerificationCode.user,
  )
  nUserVerificationCodes: NUserVerificationCode[];

  @OneToMany(() => NTypeOffer, (nTypeOffer) => nTypeOffer.idUserCreate2)
  nTypeOffers: NTypeOffer[];

  @OneToMany(() => NTypeOffer, (nTypeOffer) => nTypeOffer.idUserUpdate2)
  nTypeOffers2: NTypeOffer[];

  @OneToOne(() => NCustomer, (nCustomer) => nCustomer.user)
  nCustomer: NCustomer;

  @ManyToMany(() => NRole, (nRole) => nRole.nUsers)
  @JoinTable({
    name: 'n_user_role',
    joinColumns: [{ name: 'id_user', referencedColumnName: 'idUser' }],
    inverseJoinColumns: [{ name: 'id_role', referencedColumnName: 'idRole' }],
    schema: 'ies9021_coco',
  })
  nRoles: NRole[];
}
