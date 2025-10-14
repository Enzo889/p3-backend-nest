import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from './article.entity';
import { Postulation } from './postulation.entity';

@Index('id_user_update', ['idUserUpdate'], {})
@Index('id_user_create', ['idUserCreate'], {})
@Index('fk_inventory_postulation', ['idPostulation'], {})
@Index('id_article', ['idArticle'], {})
@Entity('inventory', { schema: 'ies9021_coco' })
export class Inventory {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id_inventory' })
  idInventory: string;

  @Column('int', { name: 'id_article', nullable: true })
  idArticle: number | null;

  @Column('int', { name: 'cant', nullable: true })
  cant: number | null;

  @Column('double', { name: 'cost', nullable: true, precision: 22 })
  cost: number | null;

  @Column('int', { name: 'id_postulation', nullable: true })
  idPostulation: number | null;

  @Column('int', { name: 'id_user_update', nullable: true })
  idUserUpdate: number | null;

  @Column('int', { name: 'id_user_create', nullable: true })
  idUserCreate: number | null;

  @Column('timestamp', {
    name: 'date_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateUpdate: Date;

  @Column('timestamp', {
    name: 'date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateCreate: Date;

  @Column('int', { name: 'quantity', default: () => "'0'" })
  quantity: number;

  @ManyToOne(() => Article, (article) => article.inventories, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_article', referencedColumnName: 'idArticle' }])
  idArticle2: Article;

  @ManyToOne(() => Postulation, (postulation) => postulation.inventories, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([
    { name: 'id_postulation', referencedColumnName: 'idpostulation' },
  ])
  idPostulation2: Postulation;
}
