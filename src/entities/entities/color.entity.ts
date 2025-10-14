import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Grade } from './grade.entity';

@Entity('color', { schema: 'ies9021_coco' })
export class Color {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_color' })
  idColor: number;

  @Column('varchar', { name: 'color_name', length: 50 })
  colorName: string;

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

  @OneToMany(() => Grade, (grade) => grade.idColor2)
  grades: Grade[];
}
