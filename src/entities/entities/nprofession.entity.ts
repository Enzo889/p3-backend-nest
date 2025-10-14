import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NProvider } from './nprovider.entity';

@Index('name', ['name'], { unique: true })
@Entity('n_profession', { schema: 'ies9021_coco' })
export class NProfession {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_profession' })
  idProfession: number;

  @Column('varchar', { name: 'name', unique: true, length: 100 })
  name: string;

  @OneToMany(() => NProvider, (nProvider) => nProvider.idProfession2)
  nProviders: NProvider[];
}
