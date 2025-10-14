import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Provider } from './provider.entity';

@Index('id_category', ['idCategory'], {})
@Index('id_user_create', ['idUserCreate'], {})
@Index('id_user_update', ['idUserUpdate'], {})
@Entity('profession', { schema: 'ies9021_coco' })
export class Profession {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_profession' })
  idProfession: number;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('bigint', { name: 'id_category', nullable: true })
  idCategory: string | null;

  @Column('bigint', { name: 'id_user_create', nullable: true })
  idUserCreate: string | null;

  @Column('bigint', { name: 'id_user_update', nullable: true })
  idUserUpdate: string | null;

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

  @OneToMany(() => Provider, (provider) => provider.idProfession2)
  providers: Provider[];
}
