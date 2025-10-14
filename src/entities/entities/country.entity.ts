import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerAddress } from './customeraddress.entity';
import { NProvince } from './nprovince.entity';
import { Departament } from './departament.entity';
import { NDepartment } from './ndepartment.entity';
import { ProviderAddress } from './provideraddress.entity';
import { Zone } from './zone.entity';
import { Province } from './province.entity';

@Index('id_user_create', ['idUserCreate'], {})
@Index('id_user_update', ['idUserUpdate'], {})
@Entity('country', { schema: 'ies9021_coco' })
export class Country {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_country' })
  idCountry: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('tinyint', { name: 'argentina', nullable: true, width: 1 })
  argentina: boolean | null;

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

  @OneToMany(
    () => CustomerAddress,
    (customerAddress) => customerAddress.idCountry2,
  )
  customerAddresses: CustomerAddress[];

  @OneToMany(() => NProvince, (nProvince) => nProvince.idCountry2)
  nProvinces: NProvince[];

  @OneToMany(() => Departament, (departament) => departament.idCountry2)
  departaments: Departament[];

  @OneToMany(() => NDepartment, (nDepartment) => nDepartment.idCountry2)
  nDepartments: NDepartment[];

  @OneToMany(
    () => ProviderAddress,
    (providerAddress) => providerAddress.idCountry2,
  )
  providerAddresses: ProviderAddress[];

  @OneToMany(() => Zone, (zone) => zone.idCountry2)
  zones: Zone[];

  @OneToMany(() => Province, (province) => province.idCountry2)
  provinces: Province[];
}
