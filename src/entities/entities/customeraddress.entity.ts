import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Country } from './country.entity';
import { Province } from './province.entity';
import { Departament } from './departament.entity';
import { City } from './city.entity';

@Index('id_customer', ['idCustomer'], {})
@Index('id_country', ['idCountry'], {})
@Index('id_province', ['idProvince'], {})
@Index('id_departament', ['idDepartament'], {})
@Index('id_city', ['idCity'], {})
@Entity('customer_address', { schema: 'ies9021_coco' })
export class CustomerAddress {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_customer_adress' })
  idCustomerAdress: number;

  @Column('int', { name: 'id_customer' })
  idCustomer: number;

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

  @ManyToOne(() => Customer, (customer) => customer.customerAddresses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_customer', referencedColumnName: 'idCustomer' }])
  idCustomer2: Customer;

  @ManyToOne(() => Country, (country) => country.customerAddresses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_country', referencedColumnName: 'idCountry' }])
  idCountry2: Country;

  @ManyToOne(() => Province, (province) => province.customerAddresses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_province', referencedColumnName: 'idProvince' }])
  idProvince2: Province;

  @ManyToOne(
    () => Departament,
    (departament) => departament.customerAddresses,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'id_departament', referencedColumnName: 'idDepartament' },
  ])
  idDepartament2: Departament;

  @ManyToOne(() => City, (city) => city.customerAddresses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_city', referencedColumnName: 'idCity' }])
  idCity2: City;
}
