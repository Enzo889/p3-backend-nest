import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { TypeProvider } from './typeprovider.entity';
import { Category } from './category.entity';
import { Profession } from './profession.entity';
import { NPortfolio } from './nportfolio.entity';
import { ProviderZone } from './providerzone.entity';
import { Availability } from './availability.entity';
import { ProviderAddress } from './provideraddress.entity';
import { Review } from './review.entity';
import { Portfolio } from './portfolio.entity';

@Index('fk_grade_provider_idx', ['idGradeProvider'], {})
@Index('fk_category_idx', ['idCategory'], {})
@Index('fk_typeprovider_idx', ['idTypeProvider'], {})
@Index('id_profession', ['idProfession'], {})
@Index('FKnfhwmlym56ylscdvkxofry87w', ['userId'], {})
@Index('FKim033jv2djfigitbuk4n5dh7d', ['idUser'], {})
@Index('FKmhg3k1mr1bluqtma101rsj20y', ['typeProviderId'], {})
@Entity('provider', { schema: 'ies9021_coco' })
export class Provider {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_provider', unsigned: true })
  idProvider: number;

  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @Column('varchar', { name: 'address', nullable: true, length: 255 })
  address: string | null;

  @Column('float', { name: 'gps_lat', nullable: true, precision: 12 })
  gpsLat: number | null;

  @Column('float', { name: 'gps_long', nullable: true, precision: 12 })
  gpsLong: number | null;

  @Column('int', { name: 'id_type_provider', nullable: true })
  idTypeProvider: number | null;

  @Column('int', { name: 'id_category', nullable: true })
  idCategory: number | null;

  @Column('int', { name: 'id_grade_provider', nullable: true })
  idGradeProvider: number | null;

  @Column('int', { name: 'id_profession', nullable: true })
  idProfession: number | null;

  @Column('int', { name: 'id_user', nullable: true })
  idUser: number | null;

  @Column('datetime', { name: 'date_create', nullable: true })
  dateCreate: Date | null;

  @Column('datetime', { name: 'date_update', nullable: true })
  dateUpdate: Date | null;

  @Column('bigint', { name: 'id_user_create', nullable: true })
  idUserCreate: string | null;

  @Column('bigint', { name: 'id_user_update', nullable: true })
  idUserUpdate: string | null;

  @Column('bigint', { name: 'id_offer', nullable: true })
  idOffer: string | null;

  @Column('int', { name: 'user_id', nullable: true })
  userId: number | null;

  @Column('float', { name: 'gps_lon', nullable: true, precision: 12 })
  gpsLon: number | null;

  @Column('int', { name: 'type_provider_id', nullable: true })
  typeProviderId: number | null;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @ManyToOne(() => User, (user) => user.providers, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_user', referencedColumnName: 'idUser' }])
  idUser2: User;

  @ManyToOne(() => TypeProvider, (typeProvider) => typeProvider.providers, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([
    { name: 'type_provider_id', referencedColumnName: 'idTypeProvider' },
  ])
  typeProvider: TypeProvider;

  @ManyToOne(() => User, (user) => user.providers2, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'idUser' }])
  user: User;

  @ManyToOne(() => Category, (category) => category.providers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_category', referencedColumnName: 'idCategory' }])
  idCategory2: Category;

  @ManyToOne(() => TypeProvider, (typeProvider) => typeProvider.providers2, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    { name: 'id_type_provider', referencedColumnName: 'idTypeProvider' },
  ])
  idTypeProvider2: TypeProvider;

  @ManyToOne(() => Profession, (profession) => profession.providers, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_profession', referencedColumnName: 'idProfession' }])
  idProfession2: Profession;

  @OneToMany(() => NPortfolio, (nPortfolio) => nPortfolio.idProvider2)
  nPortfolios: NPortfolio[];

  @OneToOne(() => ProviderZone, (providerZone) => providerZone.idProvider2)
  providerZone: ProviderZone;

  @OneToMany(() => Availability, (availability) => availability.idProvider2)
  availabilities: Availability[];

  @OneToMany(
    () => ProviderAddress,
    (providerAddress) => providerAddress.idProvider2,
  )
  providerAddresses: ProviderAddress[];

  @OneToMany(() => Review, (review) => review.idProvider2)
  reviews: Review[];

  @OneToMany(() => Portfolio, (portfolio) => portfolio.idProvider2)
  portfolios: Portfolio[];
}
