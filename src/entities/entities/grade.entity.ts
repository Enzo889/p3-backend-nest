import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Color } from './color.entity';

@Index('color', ['idColor'], {})
@Entity('grade', { schema: 'ies9021_coco' })
export class Grade {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_grade', unsigned: true })
  idGrade: number;

  @Column('int', { name: 'grade_number' })
  gradeNumber: number;

  @Column('int', { name: 'id_color' })
  idColor: number;

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

  @ManyToOne(() => Color, (color) => color.grades, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_color', referencedColumnName: 'idColor' }])
  idColor2: Color;
}
