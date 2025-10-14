import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NPostulationStateHistory } from './npostulationstatehistory.entity';
import { NPostulationBudget } from './npostulationbudget.entity';
import { NPostulationState } from './npostulationstate.entity';
import { NPostulationMaterial } from './npostulationmaterial.entity';

@Index('id_state', ['idState'], {})
@Entity('n_postulation', { schema: 'ies9021_coco' })
export class NPostulation {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_postulation' })
  idPostulation: number;

  @Column('int', { name: 'id_petition' })
  idPetition: number;

  @Column('int', { name: 'id_provider' })
  idProvider: number;

  @Column('tinyint', { name: 'winner', width: 1, default: () => "'0'" })
  winner: boolean;

  @Column('varchar', { name: 'proposal', nullable: true, length: 255 })
  proposal: string | null;

  @Column('int', { name: 'id_state', default: () => "'1'" })
  idState: number;

  @Column('varchar', { name: 'current', nullable: true, length: 45 })
  current: string | null;

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
    default: () => "'0000-00-00 00:00:00'",
  })
  dateUpdate: Date;

  @OneToMany(
    () => NPostulationStateHistory,
    (nPostulationStateHistory) => nPostulationStateHistory.idPostulation2,
  )
  nPostulationStateHistories: NPostulationStateHistory[];

  @OneToMany(
    () => NPostulationBudget,
    (nPostulationBudget) => nPostulationBudget.idPostulation2,
  )
  nPostulationBudgets: NPostulationBudget[];

  @ManyToOne(
    () => NPostulationState,
    (nPostulationState) => nPostulationState.nPostulations,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'id_state', referencedColumnName: 'idState' }])
  idState2: NPostulationState;

  @OneToMany(
    () => NPostulationMaterial,
    (nPostulationMaterial) => nPostulationMaterial.idPostulation2,
  )
  nPostulationMaterials: NPostulationMaterial[];
}
