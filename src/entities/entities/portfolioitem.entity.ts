import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Portfolio } from './portfolio.entity';
import { PortfolioMedia } from './portfoliomedia.entity';

@Index('fk_pitem_portfolio', ['idPortfolio'], {})
@Entity('portfolio_item', { schema: 'ies9021_coco' })
export class PortfolioItem {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_portfolio_item' })
  idPortfolioItem: number;

  @Column('int', { name: 'id_portfolio' })
  idPortfolio: number;

  @Column('varchar', { name: 'title', length: 255 })
  title: string;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

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

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.portfolioItems, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_portfolio', referencedColumnName: 'idPortfolio' }])
  idPortfolio2: Portfolio;

  @OneToMany(
    () => PortfolioMedia,
    (portfolioMedia) => portfolioMedia.idPortfolioItem2,
  )
  portfolioMedias: PortfolioMedia[];
}
