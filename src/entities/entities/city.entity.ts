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
import { Customer } from './customer.entity';
import { Departament } from './departament.entity';
import { ZoneCity } from './zonecity.entity';
import { ProviderAddress } from './provideraddress.entity';
import { Zone } from './zone.entity';

@Index('id_departamento_idx', ['idDepartment'], {})
@Entity('city', { schema: 'ies9021_coco' })
export class City {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_city' })
  idCity: number;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('int', { name: 'id_department', nullable: true })
  idDepartment: number | null;

  @Column('varchar', { name: 'postal_code', length: 255 })
  postalCode: string;

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
    (customerAddress) => customerAddress.idCity2,
  )
  customerAddresses: CustomerAddress[];

  @OneToMany(() => Customer, (customer) => customer.idCity2)
  customers: Customer[];

  @ManyToOne(() => Departament, (departament) => departament.cities, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    { name: 'id_department', referencedColumnName: 'idDepartament' },
  ])
  idDepartment2: Departament;

  @OneToMany(() => ZoneCity, (zoneCity) => zoneCity.idCity2)
  zoneCities: ZoneCity[];

  @OneToMany(
    () => ProviderAddress,
    (providerAddress) => providerAddress.idCity2,
  )
  providerAddresses: ProviderAddress[];

  @OneToMany(() => Zone, (zone) => zone.idCity2)
  zones: Zone[];
}
