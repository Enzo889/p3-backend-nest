import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Notification } from './notification.entity';

@Index('id_notification_idx', ['idNotification'], {})
@Index('FKkg0bs5m9x6n3kj4h4ae1mue17', ['idUser'], {})
@Entity('notification_history', { schema: 'ies9021_coco' })
export class NotificationHistory {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_notification_history' })
  idNotificationHistory: number;

  @Column('int', { name: 'id_notification', nullable: true })
  idNotification: number | null;

  @Column('int', { name: 'id_user_create', nullable: true })
  idUserCreate: number | null;

  @Column('int', { name: 'id_user_update', nullable: true })
  idUserUpdate: number | null;

  @Column('timestamp', { name: 'date_create', nullable: true })
  dateCreate: Date | null;

  @Column('timestamp', { name: 'date_update', nullable: true })
  dateUpdate: Date | null;

  @Column('varchar', { name: 'event', nullable: true, length: 50 })
  event: string | null;

  @Column('datetime', { name: 'event_date', nullable: true })
  eventDate: Date | null;

  @Column('int', { name: 'id_user', nullable: true })
  idUser: number | null;

  @ManyToOne(() => User, (user) => user.notificationHistories, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_user', referencedColumnName: 'idUser' }])
  idUser2: User;

  @ManyToOne(
    () => Notification,
    (notification) => notification.notificationHistories,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([
    { name: 'id_notification', referencedColumnName: 'idNotification' },
  ])
  idNotification2: Notification;
}
