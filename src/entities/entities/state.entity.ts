import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Petition } from './petition.entity';
import { PetitionStateHistory } from './petitionstatehistory.entity';

@Index('uk_state_code', ['code'], { unique: true })
@Entity('state', { schema: 'ies9021_coco' })
export class State {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_state' })
  idState: number;

  @Column('varchar', { name: 'state', nullable: true, length: 20 })
  state: string | null;

  @Column('varchar', { name: 'code', nullable: true, unique: true, length: 10 })
  code: string | null;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string | null;

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

  @OneToMany(() => Petition, (petition) => petition.idState2)
  petitions: Petition[];

  @OneToMany(
    () => PetitionStateHistory,
    (petitionStateHistory) => petitionStateHistory.idState2,
  )
  petitionStateHistories: PetitionStateHistory[];
}
