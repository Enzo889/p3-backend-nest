import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from './article.entity';
import { Petition } from './petition.entity';

@Index('fk_petitionmaterial_petition', ['idPetition'], {})
@Index('fk_petitionmaterial_article', ['idArticle'], {})
@Entity('petition_material', { schema: 'ies9021_coco' })
export class PetitionMaterial {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_petition_material' })
  idPetitionMaterial: number;

  @Column('int', { name: 'id_petition' })
  idPetition: number;

  @Column('int', { name: 'id_article' })
  idArticle: number;

  @Column('int', { name: 'quantity' })
  quantity: number;

  @Column('double', { name: 'unit_price', precision: 22 })
  unitPrice: number;

  @Column('double', { name: 'total_price', precision: 22 })
  totalPrice: number;

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

  @ManyToOne(() => Article, (article) => article.petitionMaterials, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_article', referencedColumnName: 'idArticle' }])
  idArticle2: Article;

  @ManyToOne(() => Petition, (petition) => petition.petitionMaterials, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_petition', referencedColumnName: 'idPetition' }])
  idPetition2: Petition;
}
