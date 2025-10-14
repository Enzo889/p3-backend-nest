import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';

@Index('id_user_create', ['idUserCreate'], {})
@Index('id_user_update', ['idUserUpdate'], {})
@Index('FKiwfieew6rymnd88ihgpx5t286', ['idCustomer'], {})
@Entity('gender', { schema: 'ies9021_coco' })
export class Gender {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_gender' })
  idGender: number;

  @Column('varchar', { name: 'gender', nullable: true, length: 255 })
  gender: string | null;

  @Column('int', { name: 'id_user_create', nullable: true })
  idUserCreate: number | null;

  @Column('int', { name: 'id_user_update', nullable: true })
  idUserUpdate: number | null;

  @Column('datetime', { name: 'date_create', nullable: true })
  dateCreate: Date | null;

  @Column('datetime', { name: 'date_update', nullable: true })
  dateUpdate: Date | null;

  @Column('int', { name: 'id_customer', nullable: true })
  idCustomer: number | null;

  @ManyToOne(() => Customer, (customer) => customer.genders, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_customer', referencedColumnName: 'idCustomer' }])
  idCustomer2: Customer;

  @OneToMany(() => Customer, (customer) => customer.idGender2)
  customers: Customer[];
}
