import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProviderZone } from './providerzone.entity';
import { City } from './city.entity';

@Index('id_zone', ['idZone'], {})
@Index('id_city', ['idCity'], {})
@Entity('zone_city', { schema: 'ies9021_coco' })
export class ZoneCity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_zone_city' })
  idZoneCity: number;

  @Column('bigint', { name: 'id_zone', unsigned: true })
  idZone: string;

  @Column('int', { name: 'id_city' })
  idCity: number;

  @ManyToOne(() => ProviderZone, (providerZone) => providerZone.zoneCities, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_zone', referencedColumnName: 'idZone' }])
  idZone2: ProviderZone;

  @ManyToOne(() => City, (city) => city.zoneCities, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_city', referencedColumnName: 'idCity' }])
  idCity2: City;
}
