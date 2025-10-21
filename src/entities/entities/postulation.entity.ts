import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Inventory } from './inventory.entity';

@Index('id_user_update', ['idUserUpdate'], {})
@Index('id_user_create', ['idUserCreate'], {})
@Index('id_provider', ['idProvider'], {})
@Index('id_petition', ['idPetition'], {})
@Entity('postulation', { schema: 'ies9021_coco' })
export class Postulation {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_postulation' })
  idpostulation: number;

  @Column('bigint', { name: 'id_petition', nullable: true })
  idPetition: string | null;

  @Column('bigint', { name: 'id_provider', nullable: true })
  idProvider: string | null;

  @Column('tinyint', { name: 'winner', width: 1, default: () => "'0'" })
  winner: boolean;

  @Column('varchar', { name: 'proposal', nullable: true, length: 255 })
  proposal: string | null;

  @Column('bigint', { name: 'cost', nullable: true })
  cost: string | null;

  @Column('int', { name: 'id_state', nullable: true, default: () => "'3'" })
  idState: number | null;

  @Column('bigint', { name: 'id_user_create', nullable: true })
  idUserCreate: string | null;

  @Column('bigint', { name: 'id_user_update', nullable: true })
  idUserUpdate: string | null;

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

  @OneToMany(() => Inventory, (inventory) => inventory.idPostulation2)
  inventories: Inventory[];
}
