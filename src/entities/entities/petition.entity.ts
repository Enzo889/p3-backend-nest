import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PetitionMaterial } from './petitionmaterial.entity';
import { PetitionAttachment } from './petitionattachment.entity';
import { State } from './state.entity';
import { TypePetition } from './typepetition.entity';
import { PetitionStateHistory } from './petitionstatehistory.entity';
import { Message } from './message.entity';
import { Review } from './review.entity';

@Index('id_user_update', ['idUserUpdate'], {})
@Index('id_user_create', ['idUserCreate'], {})
@Index('type', ['idTypePetition'], {})
@Index('fk_petition_state', ['idState'], {})
@Entity('petition', { schema: 'ies9021_coco' })
export class Petition {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_petition' })
  idPetition: number;

  @Column('int', { name: 'id_type_petition', nullable: true })
  idTypePetition: number | null;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('date', { name: 'date_since', nullable: true })
  dateSince: string | null;

  @Column('date', { name: 'date_until', nullable: true })
  dateUntil: string | null;

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

  @Column('int', {
    name: 'id_state',
    nullable: true,
    comment:
      'Clave foránea para el estado de la petición (ej. Pendiente, Adjudicada, Cancelada). Permite NULL.',
  })
  idState: number | null;

  @Column('int', { name: 'id_customer' })
  idCustomer: number;

  @Column('int', { name: 'id_category' })
  idCategory: number;

  @OneToMany(
    () => PetitionMaterial,
    (petitionMaterial) => petitionMaterial.idPetition2,
  )
  petitionMaterials: PetitionMaterial[];

  @OneToMany(
    () => PetitionAttachment,
    (petitionAttachment) => petitionAttachment.idPetition2,
  )
  petitionAttachments: PetitionAttachment[];

  @ManyToOne(() => State, (state) => state.petitions, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_state', referencedColumnName: 'idState' }])
  idState2: State;

  @ManyToOne(() => TypePetition, (typePetition) => typePetition.petitions, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    { name: 'id_type_petition', referencedColumnName: 'idTypePetition' },
  ])
  idTypePetition2: TypePetition;

  @OneToMany(
    () => PetitionStateHistory,
    (petitionStateHistory) => petitionStateHistory.idPetition2,
  )
  petitionStateHistories: PetitionStateHistory[];

  @OneToMany(() => Message, (message) => message.idPetition2)
  messages: Message[];

  @OneToMany(() => Review, (review) => review.idPetition2)
  reviews: Review[];
}
