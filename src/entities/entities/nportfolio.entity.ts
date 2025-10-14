import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Provider } from './provider.entity';
import { User } from './user.entity';

@Index('fk_n_portfolio_provider', ['idProvider'], {})
@Index('fk_n_portfolio_user_create', ['idUserCreate'], {})
@Index('fk_n_portfolio_user_update', ['idUserUpdate'], {})
@Entity('n_portfolio', { schema: 'ies9021_coco' })
export class NPortfolio {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_portfolio' })
  idPortfolio: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('int', { name: 'id_provider', unsigned: true })
  idProvider: number;

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

  @ManyToOne(() => Provider, (provider) => provider.nPortfolios, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_provider', referencedColumnName: 'idProvider' }])
  idProvider2: Provider;

  @ManyToOne(() => User, (user) => user.nPortfolios, {
    onDelete: 'SET NULL',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_user_create', referencedColumnName: 'idUser' }])
  idUserCreate2: User;

  @ManyToOne(() => User, (user) => user.nPortfolios2, {
    onDelete: 'SET NULL',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_user_update', referencedColumnName: 'idUser' }])
  idUserUpdate2: User;
}
