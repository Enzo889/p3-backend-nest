import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Petition } from './petition.entity';
import { State } from './state.entity';
import { User } from './user.entity';

@Index('fk_statehistory_petition', ['idPetition'], {})
@Index('fk_statehistory_state', ['idState'], {})
@Index('fk_statehistory_user', ['changedByUser'], {})
@Entity('petition_state_history', { schema: 'ies9021_coco' })
export class PetitionStateHistory {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_petition_state_history' })
  idPetitionStateHistory: number;

  @Column('int', { name: 'id_petition' })
  idPetition: number;

  @Column('int', { name: 'id_state' })
  idState: number;

  @Column('int', { name: 'changed_by_user' })
  changedByUser: number;

  @Column('timestamp', {
    name: 'change_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  changeDate: Date;

  @Column('varchar', { name: 'note', nullable: true, length: 255 })
  note: string | null;

  @ManyToOne(() => Petition, (petition) => petition.petitionStateHistories, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_petition', referencedColumnName: 'idPetition' }])
  idPetition2: Petition;

  @ManyToOne(() => State, (state) => state.petitionStateHistories, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_state', referencedColumnName: 'idState' }])
  idState2: State;

  @ManyToOne(() => User, (user) => user.petitionStateHistories, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'changed_by_user', referencedColumnName: 'idUser' }])
  changedByUser2: User;
}
