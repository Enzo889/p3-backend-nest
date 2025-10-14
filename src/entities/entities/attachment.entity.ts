import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Parameter } from './parameter.entity';

@Index('id_petition_idx', ['idPetition'], {})
@Index('idx_attachment_id_portfolio', ['idPortfolio'], {})
@Index('id_portfolio', ['idPortfolio'], {})
@Entity('attachment', { schema: 'ies9021_coco' })
export class Attachment {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_attachment' })
  idAttachment: number;

  @Column('int', { name: 'id_petition', nullable: true })
  idPetition: number | null;

  @Column('int', { name: 'id_portfolio', nullable: true })
  idPortfolio: number | null;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'path', nullable: true, length: 255 })
  path: string | null;

  @Column('int', { name: 'id_user_update', nullable: true })
  idUserUpdate: number | null;

  @Column('int', { name: 'id_user_create' })
  idUserCreate: number;

  @Column('datetime', {
    name: 'date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateCreate: Date;

  @Column('datetime', {
    name: 'date_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateUpdate: Date;

  @OneToMany(() => Parameter, (parameter) => parameter.idAttachment2)
  parameters: Parameter[];
}
