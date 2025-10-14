import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PetitionMaterial } from './petitionmaterial.entity';
import { Inventory } from './inventory.entity';

@Index('id_user_create', ['idUserCreate'], {})
@Index('id_user_update', ['idUserUpdate'], {})
@Index('fk_article_category', ['idCategory'], {})
@Entity('article', { schema: 'ies9021_coco' })
export class Article {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_article' })
  idArticle: number;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('bigint', { name: 'id_category', nullable: true })
  idCategory: string | null;

  @Column('int', { name: 'id_user_create', nullable: true })
  idUserCreate: number | null;

  @Column('int', { name: 'id_user_update', nullable: true })
  idUserUpdate: number | null;

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

  @OneToMany(
    () => PetitionMaterial,
    (petitionMaterial) => petitionMaterial.idArticle2,
  )
  petitionMaterials: PetitionMaterial[];

  @OneToMany(() => Inventory, (inventory) => inventory.idArticle2)
  inventories: Inventory[];
}
