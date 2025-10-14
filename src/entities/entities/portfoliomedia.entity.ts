import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PortfolioItem } from './portfolioitem.entity';

@Index('fk_pmedia_item', ['idPortfolioItem'], {})
@Entity('portfolio_media', { schema: 'ies9021_coco' })
export class PortfolioMedia {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_portfolio_media' })
  idPortfolioMedia: number;

  @Column('int', { name: 'id_portfolio_item' })
  idPortfolioItem: number;

  @Column('varchar', { name: 'url', length: 500 })
  url: string;

  @Column('varchar', { name: 'type', length: 50 })
  type: string;

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

  @ManyToOne(
    () => PortfolioItem,
    (portfolioItem) => portfolioItem.portfolioMedias,
    { onDelete: 'CASCADE', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'id_portfolio_item', referencedColumnName: 'idPortfolioItem' },
  ])
  idPortfolioItem2: PortfolioItem;
}
