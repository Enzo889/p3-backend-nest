import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeJornal } from './typejornal.entity';
import { Availability } from './availability.entity';

@Index('fk_user_create', ['idUserCreate'], {})
@Index('fk_user_update', ['idUserUpdate'], {})
@Index('fk_id_type_jornal', ['idTypeJornal'], {})
@Entity('week', { schema: 'ies9021_coco' })
export class Week {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_week' })
  idWeek: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('int', { name: 'id_type_jornal', nullable: true })
  idTypeJornal: number | null;

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

  @Column('varchar', { name: 'week_col', nullable: true, length: 55 })
  weekCol: string | null;

  @ManyToOne(() => TypeJornal, (typeJornal) => typeJornal.weeks, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([
    { name: 'id_type_jornal', referencedColumnName: 'idTypeJornal' },
  ])
  idTypeJornal2: TypeJornal;

  @OneToMany(() => Availability, (availability) => availability.idWeek2)
  availabilities: Availability[];
}
