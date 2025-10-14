import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NPostulation } from './npostulation.entity';
import { NPostulationState } from './npostulationstate.entity';

@Index('id_postulation', ['idPostulation'], {})
@Index('id_state', ['idState'], {})
@Entity('n_postulation_state_history', { schema: 'ies9021_coco' })
export class NPostulationStateHistory {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_history' })
  idHistory: number;

  @Column('int', { name: 'id_postulation' })
  idPostulation: number;

  @Column('int', { name: 'id_state' })
  idState: number;

  @Column('int', { name: 'changed_by', nullable: true })
  changedBy: number | null;

  @Column('varchar', { name: 'notes', nullable: true, length: 255 })
  notes: string | null;

  @Column('timestamp', {
    name: 'date_change',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateChange: Date;

  @ManyToOne(
    () => NPostulation,
    (nPostulation) => nPostulation.nPostulationStateHistories,
    { onDelete: 'CASCADE', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'id_postulation', referencedColumnName: 'idPostulation' },
  ])
  idPostulation2: NPostulation;

  @ManyToOne(
    () => NPostulationState,
    (nPostulationState) => nPostulationState.nPostulationStateHistories,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'id_state', referencedColumnName: 'idState' }])
  idState2: NPostulationState;
}
