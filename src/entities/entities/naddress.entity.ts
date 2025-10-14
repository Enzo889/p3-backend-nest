import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NProvider } from './nprovider.entity';
import { NCity } from './ncity.entity';
import { NCustomer } from './ncustomer.entity';

@Index('fk_address_city', ['idCity'], {})
@Entity('n_address', { schema: 'ies9021_coco' })
export class NAddress {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_address' })
  idAddress: number;

  @Column('varchar', { name: 'street', nullable: true, length: 255 })
  street: string | null;

  @Column('varchar', { name: 'number', nullable: true, length: 10 })
  number: string | null;

  @Column('varchar', { name: 'floor', nullable: true, length: 10 })
  floor: string | null;

  @Column('varchar', { name: 'apartment', nullable: true, length: 10 })
  apartment: string | null;

  @Column('varchar', { name: 'postal_code', nullable: true, length: 20 })
  postalCode: string | null;

  @Column('int', { name: 'id_city' })
  idCity: number;

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

  @OneToMany(() => NProvider, (nProvider) => nProvider.address)
  nProviders: NProvider[];

  @ManyToOne(() => NCity, (nCity) => nCity.nAddresses, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_city', referencedColumnName: 'idCity' }])
  idCity2: NCity;

  @OneToMany(() => NCustomer, (nCustomer) => nCustomer.address)
  nCustomers: NCustomer[];
}
