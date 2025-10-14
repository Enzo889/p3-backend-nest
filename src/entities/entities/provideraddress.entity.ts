import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Provider } from './provider.entity';
import { Country } from './country.entity';
import { Province } from './province.entity';
import { Departament } from './departament.entity';
import { City } from './city.entity';

@Index('id_provider', ['idProvider'], {})
@Index('id_country', ['idCountry'], {})
@Index('id_province', ['idProvince'], {})
@Index('id_departament', ['idDepartament'], {})
@Index('id_city', ['idCity'], {})
@Entity('provider_address', { schema: 'ies9021_coco' })
export class ProviderAddress {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_provider_adress' })
  idProviderAdress: number;

  @Column('int', { name: 'id_provider', unsigned: true })
  idProvider: number;

  @Column('int', { name: 'id_country' })
  idCountry: number;

  @Column('int', { name: 'id_province' })
  idProvince: number;

  @Column('int', { name: 'id_departament' })
  idDepartament: number;

  @Column('int', { name: 'id_city' })
  idCity: number;

  @Column('varchar', { name: 'street', length: 255 })
  street: string;

  @Column('varchar', { name: 'number_str', nullable: true, length: 10 })
  numberStr: string | null;

  @Column('varchar', { name: 'dpto', nullable: true, length: 10 })
  dpto: string | null;

  @Column('varchar', { name: 'floor_dpto', nullable: true, length: 10 })
  floorDpto: string | null;

  @Column('int', { name: 'id_user_create', nullable: true })
  idUserCreate: number | null;

  @Column('int', { name: 'id_user_update', nullable: true })
  idUserUpdate: number | null;

  @Column('timestamp', {
    name: 'date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateCreate: Date;

  @Column('timestamp', {
    name: 'date_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateUpdate: Date;

  @ManyToOne(() => Provider, (provider) => provider.providerAddresses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_provider', referencedColumnName: 'idProvider' }])
  idProvider2: Provider;

  @ManyToOne(() => Country, (country) => country.providerAddresses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_country', referencedColumnName: 'idCountry' }])
  idCountry2: Country;

  @ManyToOne(() => Province, (province) => province.providerAddresses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_province', referencedColumnName: 'idProvince' }])
  idProvince2: Province;

  @ManyToOne(
    () => Departament,
    (departament) => departament.providerAddresses,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'id_departament', referencedColumnName: 'idDepartament' },
  ])
  idDepartament2: Departament;

  @ManyToOne(() => City, (city) => city.providerAddresses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_city', referencedColumnName: 'idCity' }])
  idCity2: City;
}
