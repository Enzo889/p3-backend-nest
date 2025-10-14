import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hour } from './hour.entity';
import { Provider } from './provider.entity';
import { Week } from './week.entity';

@Index('id_user_update', ['idUserUpdate'], {})
@Index('id_user_create', ['idUserCreate'], {})
@Index('id_provider', ['idProvider'], {})
@Index('week', ['idWeek'], {})
@Index('FK23w9m8krlw2w21uw2vhnslwb1', ['idFromHour'], {})
@Index('FKiq36c0ch9pxyk57nnhlgqs8qn', ['idUntilHour'], {})
@Entity('availability', { schema: 'ies9021_coco' })
export class Availability {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_availability' })
  idAvailability: number;

  @Column('int', { name: 'id_from_hour' })
  idFromHour: number;

  @Column('int', { name: 'id_until_hour' })
  idUntilHour: number;

  @Column('int', { name: 'id_week', nullable: true })
  idWeek: number | null;

  @Column('int', { name: 'id_provider', nullable: true, unsigned: true })
  idProvider: number | null;

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

  @ManyToOne(() => Hour, (hour) => hour.availabilities, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_from_hour', referencedColumnName: 'idHour' }])
  idFromHour2: Hour;

  @ManyToOne(() => Provider, (provider) => provider.availabilities, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_provider', referencedColumnName: 'idProvider' }])
  idProvider2: Provider;

  @ManyToOne(() => Hour, (hour) => hour.availabilities2, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_until_hour', referencedColumnName: 'idHour' }])
  idUntilHour2: Hour;

  @ManyToOne(() => Week, (week) => week.availabilities, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_week', referencedColumnName: 'idWeek' }])
  idWeek2: Week;
}
