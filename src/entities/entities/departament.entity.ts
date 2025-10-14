import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerAddress } from './customeraddress.entity';
import { City } from './city.entity';
import { Country } from './country.entity';
import { Province } from './province.entity';
import { ProviderAddress } from './provideraddress.entity';
import { Zone } from './zone.entity';

@Index('id_user_update', ['idUserUpdate'], {})
@Index('id_user_create', ['idUserCreate'], {})
@Index('country', ['idCountry'], {})
@Index('province', ['idProvince'], {})
@Entity('departament', { schema: 'ies9021_coco' })
export class Departament {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_departament' })
  idDepartament: number;

  @Column('varchar', { name: 'name_departament', nullable: true, length: 40 })
  nameDepartament: string | null;

  @Column('int', { name: 'id_country', nullable: true })
  idCountry: number | null;

  @Column('int', { name: 'id_province', nullable: true })
  idProvince: number | null;

  @Column('int', { name: 'id_user_update', nullable: true })
  idUserUpdate: number | null;

  @Column('int', { name: 'id_user_create', nullable: true })
  idUserCreate: number | null;

  @Column('datetime', { name: 'date_create', nullable: true })
  dateCreate: Date | null;

  @Column('datetime', { name: 'date_update', nullable: true })
  dateUpdate: Date | null;

  @OneToMany(
    () => CustomerAddress,
    (customerAddress) => customerAddress.idDepartament2,
  )
  customerAddresses: CustomerAddress[];

  @OneToMany(() => City, (city) => city.idDepartment2)
  cities: City[];

  @ManyToOne(() => Country, (country) => country.departaments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_country', referencedColumnName: 'idCountry' }])
  idCountry2: Country;

  @ManyToOne(() => Province, (province) => province.departaments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_province', referencedColumnName: 'idProvince' }])
  idProvince2: Province;

  @OneToMany(
    () => ProviderAddress,
    (providerAddress) => providerAddress.idDepartament2,
  )
  providerAddresses: ProviderAddress[];

  @OneToMany(() => Zone, (zone) => zone.idDepartament2)
  zones: Zone[];
}
