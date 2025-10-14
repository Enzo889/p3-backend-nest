import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PortfolioItem } from './portfolioitem.entity';
import { NPortfolioAttachment } from './nportfolioattachment.entity';
import { Provider } from './provider.entity';

@Index('id_providerr_idx', ['idProvider'], {})
@Entity('portfolio', { schema: 'ies9021_coco' })
export class Portfolio {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_portfolio' })
  idPortfolio: number;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string | null;

  @Column('int', { name: 'id_provider', unsigned: true })
  idProvider: number;

  @Column('int', { name: 'id_user_create', nullable: true })
  idUserCreate: number | null;

  @Column('int', { name: 'id_user_update', nullable: true })
  idUserUpdate: number | null;

  @Column('datetime', { name: 'date_create', nullable: true })
  dateCreate: Date | null;

  @Column('datetime', { name: 'date_update', nullable: true })
  dateUpdate: Date | null;

  @OneToMany(() => PortfolioItem, (portfolioItem) => portfolioItem.idPortfolio2)
  portfolioItems: PortfolioItem[];

  @OneToMany(
    () => NPortfolioAttachment,
    (nPortfolioAttachment) => nPortfolioAttachment.idPortfolio2,
  )
  nPortfolioAttachments: NPortfolioAttachment[];

  @ManyToOne(() => Provider, (provider) => provider.portfolios, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_provider', referencedColumnName: 'idProvider' }])
  idProvider2: Provider;
}
