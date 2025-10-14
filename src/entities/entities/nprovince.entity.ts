import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from './country.entity';
import { NDepartment } from './ndepartment.entity';

@Index('fk_country', ['idCountry'], {})
@Entity('n_province', { schema: 'ies9021_coco' })
export class NProvince {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_province' })
  idProvince: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('int', { name: 'id_country', nullable: true })
  idCountry: number | null;

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

  @ManyToOne(() => Country, (country) => country.nProvinces, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_country', referencedColumnName: 'idCountry' }])
  idCountry2: Country;

  @OneToMany(() => NDepartment, (nDepartment) => nDepartment.idProvince2)
  nDepartments: NDepartment[];
}
