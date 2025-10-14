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
import { Departament } from './departament.entity';
import { ProviderAddress } from './provideraddress.entity';
import { Zone } from './zone.entity';
import { Country } from './country.entity';

@Index('id_user_create', ['idUserCreate'], {})
@Index('id_user_update', ['idUserUpdate'], {})
@Index('fk_id_country', ['idCountry'], {})
@Entity('province', { schema: 'ies9021_coco' })
export class Province {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_province' })
  idProvince: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('int', { name: 'id_country', nullable: true })
  idCountry: number | null;

  @Column('tinyint', { name: 'mendoza', nullable: true, width: 1 })
  mendoza: boolean | null;

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
    (customerAddress) => customerAddress.idProvince2,
  )
  customerAddresses: CustomerAddress[];

  @OneToMany(() => Departament, (departament) => departament.idProvince2)
  departaments: Departament[];

  @OneToMany(
    () => ProviderAddress,
    (providerAddress) => providerAddress.idProvince2,
  )
  providerAddresses: ProviderAddress[];

  @OneToMany(() => Zone, (zone) => zone.idProvince2)
  zones: Zone[];

  @ManyToOne(() => Country, (country) => country.provinces, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_country', referencedColumnName: 'idCountry' }])
  idCountry2: Country;
}
