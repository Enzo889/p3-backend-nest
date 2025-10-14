import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NProvider } from './nprovider.entity';
import { NPostulationMaterial } from './npostulationmaterial.entity';

@Index('id_provider', ['idProvider'], {})
@Entity('n_material', { schema: 'ies9021_coco' })
export class NMaterial {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_material' })
  idMaterial: number;

  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @Column('int', { name: 'id_provider' })
  idProvider: number;

  @Column('decimal', { name: 'unit_price', precision: 15, scale: 2 })
  unitPrice: string;

  @Column('varchar', {
    name: 'unit',
    nullable: true,
    length: 20,
    default: () => "'unidad'",
  })
  unit: string | null;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string | null;

  @ManyToOne(() => NProvider, (nProvider) => nProvider.nMaterials, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_provider', referencedColumnName: 'idProvider' }])
  idProvider2: NProvider;

  @OneToMany(
    () => NPostulationMaterial,
    (nPostulationMaterial) => nPostulationMaterial.idMaterial2,
  )
  nPostulationMaterials: NPostulationMaterial[];
}
