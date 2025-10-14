import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Index('fk_type_offer_1_idx', ['idCategory'], {})
@Entity('type_offer', { schema: 'ies9021_coco' })
export class TypeOffer {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_type_offer' })
  idTypeOffer: number;

  @Column('int', { name: 'id_category' })
  idCategory: number;

  @Column('varchar', { name: 'nombre', length: 60 })
  nombre: string;

  @Column('int', { name: 'id_user_create' })
  idUserCreate: number;

  @Column('int', { name: 'id_user_update' })
  idUserUpdate: number;

  @Column('date', { name: 'date_create', default: () => 'CURRENT_TIMESTAMP' })
  dateCreate: string;

  @Column('date', { name: 'date_update', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdate: string;

  @ManyToOne(() => Category, (category) => category.typeOffers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_category', referencedColumnName: 'idCategory' }])
  idCategory2: Category;
}
