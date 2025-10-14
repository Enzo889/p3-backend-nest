import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NotificationPreference } from './notificationpreference.entity';

@Index('code', ['code'], { unique: true })
@Entity('notification_type', { schema: 'ies9021_coco' })
export class NotificationType {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_notification_type' })
  idNotificationType: number;

  @Column('varchar', { name: 'code', unique: true, length: 50 })
  code: string;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string | null;

  @OneToMany(
    () => NotificationPreference,
    (notificationPreference) => notificationPreference.idNotificationType2,
  )
  notificationPreferences: NotificationPreference[];
}
