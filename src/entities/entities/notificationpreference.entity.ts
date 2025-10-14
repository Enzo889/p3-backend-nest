import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NotificationType } from './notificationtype.entity';
import { User } from './user.entity';

@Index('fk_notifpref_user', ['idUser'], {})
@Index('fk_notifpref_type', ['idNotificationType'], {})
@Entity('notification_preference', { schema: 'ies9021_coco' })
export class NotificationPreference {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_notification_preference' })
  idNotificationPreference: number;

  @Column('int', { name: 'id_user' })
  idUser: number;

  @Column('int', { name: 'id_notification_type' })
  idNotificationType: number;

  @Column('tinyint', { name: 'enabled', width: 1, default: () => "'1'" })
  enabled: boolean;

  @ManyToOne(
    () => NotificationType,
    (notificationType) => notificationType.notificationPreferences,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    {
      name: 'id_notification_type',
      referencedColumnName: 'idNotificationType',
    },
  ])
  idNotificationType2: NotificationType;

  @ManyToOne(() => User, (user) => user.notificationPreferences, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_user', referencedColumnName: 'idUser' }])
  idUser2: User;
}
