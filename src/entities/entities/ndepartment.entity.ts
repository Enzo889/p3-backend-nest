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
import { NProvince } from './nprovince.entity';
import { NCity } from './ncity.entity';

@Index('fk_department_province', ['idProvince'], {})
@Index('fk_department_country', ['idCountry'], {})
@Entity('n_department', { schema: 'ies9021_coco' })
export class NDepartment {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_department' })
  idDepartment: number;

  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @Column('int', { name: 'id_province', nullable: true })
  idProvince: number | null;

  @Column('int', { name: 'id_country', nullable: true })
  idCountry: number | null;

  @Column('datetime', {
    name: 'date_create',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateCreate: Date | null;

  @Column('datetime', {
    name: 'date_update',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateUpdate: Date | null;

  @ManyToOne(() => Country, (country) => country.nDepartments, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_country', referencedColumnName: 'idCountry' }])
  idCountry2: Country;

  @ManyToOne(() => NProvince, (nProvince) => nProvince.nDepartments, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_province', referencedColumnName: 'idProvince' }])
  idProvince2: NProvince;

  @OneToMany(() => NCity, (nCity) => nCity.idDepartment2)
  nCities: NCity[];
}
