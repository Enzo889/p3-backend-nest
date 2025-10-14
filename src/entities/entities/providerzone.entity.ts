import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ZoneCity } from './zonecity.entity';
import { Provider } from './provider.entity';

@Index('id_provider', ['idProvider'], { unique: true })
@Entity('provider_zone', { schema: 'ies9021_coco' })
export class ProviderZone {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id_zone', unsigned: true })
  idZone: string;

  @Column('int', { name: 'id_provider', unique: true, unsigned: true })
  idProvider: number;

  @OneToMany(() => ZoneCity, (zoneCity) => zoneCity.idZone2)
  zoneCities: ZoneCity[];

  @OneToOne(() => Provider, (provider) => provider.providerZone, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_provider', referencedColumnName: 'idProvider' }])
  idProvider2: Provider;
}
