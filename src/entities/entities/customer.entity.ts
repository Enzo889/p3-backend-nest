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
import { Gender } from './gender.entity';
import { User } from './user.entity';
import { City } from './city.entity';
import { Interest } from './interest.entity';
import { Notification } from './notification.entity';

@Index('fk_id_gender_type', ['idGender'], {})
@Index('fk_id_city', ['idCity'], {})
@Index('fk_id_user', ['idUser'], {})
@Index('FKj8dlm21j202cadsbfkoem0s58', ['userId'], {})
@Entity('customer', { schema: 'ies9021_coco' })
export class Customer {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_customer' })
  idCustomer: number;

  @Column('varchar', { name: 'name', nullable: true, length: 100 })
  name: string | null;

  @Column('date', { name: 'date_year', nullable: true })
  dateYear: string | null;

  @Column('varchar', { name: 'dni', nullable: true, length: 20 })
  dni: string | null;

  @Column('varchar', { name: 'email', nullable: true, length: 50 })
  email: string | null;

  @Column('varchar', { name: 'phone', nullable: true, length: 20 })
  phone: string | null;

  @Column('varchar', { name: 'adress', nullable: true, length: 50 })
  adress: string | null;

  @Column('int', { name: 'id_gender', nullable: true })
  idGender: number | null;

  @Column('int', { name: 'id_city', nullable: true })
  idCity: number | null;

  @Column('decimal', {
    name: 'gps_lat',
    nullable: true,
    precision: 10,
    scale: 8,
  })
  gpsLat: string | null;

  @Column('decimal', {
    name: 'gps_lon',
    nullable: true,
    precision: 11,
    scale: 8,
  })
  gpsLon: string | null;

  @Column('int', { name: 'id_user_create', nullable: true })
  idUserCreate: number | null;

  @Column('int', { name: 'id_user_update', nullable: true })
  idUserUpdate: number | null;

  @Column('datetime', { name: 'date_create', nullable: true })
  dateCreate: Date | null;

  @Column('datetime', { name: 'date_update', nullable: true })
  dateUpdate: Date | null;

  @Column('int', { name: 'id_user', nullable: true })
  idUser: number | null;

  @Column('varchar', { name: 'address', nullable: true, length: 255 })
  address: string | null;

  @Column('int', { name: 'user_id', nullable: true })
  userId: number | null;

  @OneToMany(
    () => CustomerAddress,
    (customerAddress) => customerAddress.idCustomer2,
  )
  customerAddresses: CustomerAddress[];

  @OneToMany(() => Gender, (gender) => gender.idCustomer2)
  genders: Gender[];

  @ManyToOne(() => User, (user) => user.customers, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'idUser' }])
  user: User;

  @ManyToOne(() => City, (city) => city.customers, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_city', referencedColumnName: 'idCity' }])
  idCity2: City;

  @ManyToOne(() => Gender, (gender) => gender.customers, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_gender', referencedColumnName: 'idGender' }])
  idGender2: Gender;

  @ManyToOne(() => User, (user) => user.customers2, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_user', referencedColumnName: 'idUser' }])
  idUser2: User;

  @OneToMany(() => Interest, (interest) => interest.idCustomer2)
  interests: Interest[];

  @OneToMany(() => Notification, (notification) => notification.idCustomer2)
  notifications: Notification[];
}
