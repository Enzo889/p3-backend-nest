import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Customer } from './customer.entity';
import { InterestHistory } from './interesthistory.entity';

@Index('customer_idx', ['idCustomer'], {})
@Index('category', ['idCategory'], {})
@Entity('interest', { schema: 'ies9021_coco' })
export class Interest {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_interest' })
  idInterest: number;

  @Column('int', { name: 'id_customer', nullable: true })
  idCustomer: number | null;

  @Column('int', { name: 'id_category', nullable: true })
  idCategory: number | null;

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
    default: () => "'0000-00-00 00:00:00'",
  })
  dateUpdate: Date;

  @ManyToOne(() => Category, (category) => category.interests, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_category', referencedColumnName: 'idCategory' }])
  idCategory2: Category;

  @ManyToOne(() => Customer, (customer) => customer.interests, {
    onDelete: 'SET NULL',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_customer', referencedColumnName: 'idCustomer' }])
  idCustomer2: Customer;

  @OneToMany(
    () => InterestHistory,
    (interestHistory) => interestHistory.idInterest2,
  )
  interestHistories: InterestHistory[];
}
