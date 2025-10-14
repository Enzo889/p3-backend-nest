import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NUser } from './nuser.entity';

@Index('user_id', ['userId'], {})
@Entity('n_user_verification_code', { schema: 'ies9021_coco' })
export class NUserVerificationCode {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('varchar', { name: 'code', length: 6 })
  code: string;

  @Column('timestamp', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('tinyint', {
    name: 'is_used',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isUsed: boolean | null;

  @ManyToOne(() => NUser, (nUser) => nUser.nUserVerificationCodes, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'idUser' }])
  user: NUser;
}
