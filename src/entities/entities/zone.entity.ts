import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './city.entity';
import { Country } from './country.entity';
import { Departament } from './departament.entity';
import { Province } from './province.entity';

@Index('id_country', ['idCountry'], {})
@Index('id_province', ['idProvince'], {})
@Index('id_departament', ['idDepartament'], {})
@Index('id_city', ['idCity'], {})
@Entity('zone', { schema: 'ies9021_coco' })
export class Zone {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_zone' })
  idZone: number;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('int', { name: 'id_country', nullable: true })
  idCountry: number | null;

  @Column('int', { name: 'id_province', nullable: true })
  idProvince: number | null;

  @Column('int', { name: 'id_departament', nullable: true })
  idDepartament: number | null;

  @Column('int', { name: 'id_city', nullable: true })
  idCity: number | null;

  @Column('datetime', { name: 'date_create', nullable: true })
  dateCreate: Date | null;

  @Column('datetime', { name: 'date_update', nullable: true })
  dateUpdate: Date | null;

  @Column('bigint', { name: 'id_user_create', nullable: true })
  idUserCreate: string | null;

  @Column('bigint', { name: 'id_user_update', nullable: true })
  idUserUpdate: string | null;

  @ManyToOne(() => City, (city) => city.zones, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_city', referencedColumnName: 'idCity' }])
  idCity2: City;

  @ManyToOne(() => Country, (country) => country.zones, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_country', referencedColumnName: 'idCountry' }])
  idCountry2: Country;

  @ManyToOne(() => Departament, (departament) => departament.zones, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    { name: 'id_departament', referencedColumnName: 'idDepartament' },
  ])
  idDepartament2: Departament;

  @ManyToOne(() => Province, (province) => province.zones, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_province', referencedColumnName: 'idProvince' }])
  idProvince2: Province;
}
