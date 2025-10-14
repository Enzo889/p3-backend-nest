import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Week } from './week.entity';

@Entity('type_jornal', { schema: 'ies9021_coco' })
export class TypeJornal {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_type_jornal' })
  idTypeJornal: number;

  @Column('varchar', { name: 'type_jornal', length: 75 })
  typeJornal: string;

  @Column('varchar', { name: 'name', length: 45 })
  name: string;

  @Column('int', { name: 'id_user_create', nullable: true })
  idUserCreate: number | null;

  @Column('int', { name: 'id_user_update', nullable: true })
  idUserUpdate: number | null;

  @Column('datetime', { name: 'date_create', nullable: true })
  dateCreate: Date | null;

  @Column('datetime', { name: 'date_update', nullable: true })
  dateUpdate: Date | null;

  @OneToMany(() => Week, (week) => week.idTypeJornal2)
  weeks: Week[];
}
