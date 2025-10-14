import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Petition } from './petition.entity';
import { User } from './user.entity';

@Index('fk_message_petition', ['idPetition'], {})
@Index('fk_message_sender', ['idSenderUser'], {})
@Index('fk_message_receiver', ['idReceiverUser'], {})
@Entity('message', { schema: 'ies9021_coco' })
export class Message {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_message' })
  idMessage: number;

  @Column('int', { name: 'id_petition' })
  idPetition: number;

  @Column('int', { name: 'id_sender_user' })
  idSenderUser: number;

  @Column('int', { name: 'id_receiver_user' })
  idReceiverUser: number;

  @Column('text', { name: 'content' })
  content: string;

  @Column('tinyint', {
    name: 'viewed',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  viewed: boolean | null;

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

  @ManyToOne(() => Petition, (petition) => petition.messages, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_petition', referencedColumnName: 'idPetition' }])
  idPetition2: Petition;

  @ManyToOne(() => User, (user) => user.messages, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_receiver_user', referencedColumnName: 'idUser' }])
  idReceiverUser2: User;

  @ManyToOne(() => User, (user) => user.messages2, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_sender_user', referencedColumnName: 'idUser' }])
  idSenderUser2: User;
}
