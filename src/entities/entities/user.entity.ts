import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { Provider } from './provider.entity';
import { NPortfolio } from './nportfolio.entity';
import { PetitionStateHistory } from './petitionstatehistory.entity';
import { Message } from './message.entity';
import { NotificationPreference } from './notificationpreference.entity';
import { NotificationHistory } from './notificationhistory.entity';
import { UserInterest } from '../../user_interest/entities/user_interest.entity';

@Entity('user', { schema: 'ies9021_coco' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_user' })
  idUser: number;

  @Column('varchar', { name: 'name', nullable: true, length: 50 })
  name: string | null;

  @Column('varchar', { name: 'last_name', nullable: true, length: 50 })
  lastName: string | null;

  @Column('varchar', { name: 'email', nullable: true, length: 100 })
  email: string | null;

  @Column('varchar', { name: 'password', nullable: true, length: 255 })
  password: string | null;

  @Column('int', { name: 'group', nullable: true })
  group: number | null;

  @Column('varchar', { name: 'token', nullable: true, length: 255 })
  token: string | null;

  @Column('datetime', { name: 'date_token', nullable: true })
  dateToken: Date | null;

  @Column('int', { name: 'id_user_create', nullable: true })
  idUserCreate: number | null;

  @Column('int', { name: 'id_user_update', nullable: true })
  idUserUpdate: number | null;

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

  @Column('bit', { name: 'enabled', nullable: true })
  enabled: boolean | null;

  @Column('varchar', {
    name: 'username',
    nullable: true,
    length: 55,
    default: () => "'por defecto'",
  })
  username: string | null;

  @Column('bigint', { name: 'id_profile', nullable: true })
  idProfile: string | null;

  @OneToMany(() => Customer, (customer) => customer.idUser2)
  customers2: Customer[];

  @OneToMany(() => Provider, (provider) => provider.idUser2)
  providers: Provider[];

  @OneToMany(() => Provider, (provider) => provider.user)
  providers2: Provider[];

  @OneToMany(() => NPortfolio, (nPortfolio) => nPortfolio.idUserCreate2)
  nPortfolios: NPortfolio[];

  @OneToMany(() => NPortfolio, (nPortfolio) => nPortfolio.idUserUpdate2)
  nPortfolios2: NPortfolio[];

  @OneToMany(
    () => PetitionStateHistory,
    (petitionStateHistory) => petitionStateHistory.changedByUser2,
  )
  petitionStateHistories: PetitionStateHistory[];

  @OneToMany(() => Message, (message) => message.idReceiverUser2)
  messages: Message[];

  @OneToMany(() => Message, (message) => message.idSenderUser2)
  messages2: Message[];

  @OneToMany(
    () => NotificationPreference,
    (notificationPreference) => notificationPreference.idUser2,
  )
  notificationPreferences: NotificationPreference[];

  @OneToMany(
    () => NotificationHistory,
    (notificationHistory) => notificationHistory.idUser2,
  )
  notificationHistories: NotificationHistory[];

  @OneToMany(() => UserInterest, (userInterest) => userInterest.user)
  userInterests: UserInterest[];
}
