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
import { NUser } from './nuser.entity';
import { NAddress } from './naddress.entity';
import { NInterest } from './ninterest.entity';

@Index('user_id', ['userId'], { unique: true })
@Index('address_id', ['addressId'], {})
@Entity('n_customer', { schema: 'ies9021_coco' })
export class NCustomer {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_customer' })
  idCustomer: number;

  @Column('int', { name: 'user_id', unique: true })
  userId: number;

  @Column('varchar', { name: 'dni', nullable: true, length: 20 })
  dni: string | null;

  @Column('varchar', { name: 'phone', nullable: true, length: 20 })
  phone: string | null;

  @Column('int', { name: 'address_id', nullable: true })
  addressId: number | null;

  @OneToOne(() => NUser, (nUser) => nUser.nCustomer, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'idUser' }])
  user: NUser;

  @ManyToOne(() => NAddress, (nAddress) => nAddress.nCustomers, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'idAddress' }])
  address: NAddress;

  @OneToMany(() => NInterest, (nInterest) => nInterest.idCustomer2)
  nInterests: NInterest[];
}
