import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NAddress } from './naddress.entity';
import { NProvider } from './nprovider.entity';
import { NDepartment } from './ndepartment.entity';

@Index('fk_city_department', ['idDepartment'], {})
@Entity('n_city', { schema: 'ies9021_coco' })
export class NCity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_city' })
  idCity: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'postal_code', length: 20 })
  postalCode: string;

  @Column('int', { name: 'id_department', nullable: true })
  idDepartment: number | null;

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

  @OneToMany(() => NAddress, (nAddress) => nAddress.idCity2)
  nAddresses: NAddress[];

  @ManyToMany(() => NProvider, (nProvider) => nProvider.nCities)
  nProviders: NProvider[];

  @ManyToOne(() => NDepartment, (nDepartment) => nDepartment.nCities, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_department', referencedColumnName: 'idDepartment' }])
  idDepartment2: NDepartment;
}
