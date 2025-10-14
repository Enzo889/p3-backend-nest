import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attachment } from './attachment.entity';

@Index('atachment_idx', ['idAttachment'], {})
@Entity('parameter', { schema: 'ies9021_coco' })
export class Parameter {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_parameter' })
  idParameter: number;

  @Column('datetime', { name: 'taken_hour', nullable: true })
  takenHour: Date | null;

  @Column('varchar', { name: 'name_application', nullable: true, length: 255 })
  nameApplication: string | null;

  @Column('varchar', { name: 'version', nullable: true, length: 50 })
  version: string | null;

  @Column('int', { name: 'id_attachment', nullable: true })
  idAttachment: number | null;

  @Column('varchar', { name: 'subtitle', nullable: true, length: 255 })
  subtitle: string | null;

  @Column('varchar', { name: 'author_right', nullable: true, length: 255 })
  authorRight: string | null;

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

  @ManyToOne(() => Attachment, (attachment) => attachment.parameters, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_attachment', referencedColumnName: 'idPetition' }])
  idAttachment2: Attachment;
}
