import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NProvider } from './nprovider.entity';
import { NTypeOffer } from './ntypeoffer.entity';
import { NUser } from './nuser.entity';

@Index('fk_offer_type', ['idTypeOffer'], {})
@Index('fk_offer_provider', ['idProvider'], {})
@Index('fk_offer_user_update', ['userUpdateId'], {})
@Index('idx_offer_dates', ['dateOpen', 'dateClose'], {})
@Index('idx_offer_user', ['userCreateId'], {})
@Entity('n_offers', { schema: 'ies9021_coco' })
export class NOffers {
  @PrimaryGeneratedColumn({ type: 'int', name: 'offer_id' })
  offerId: number;

  @Column('int', { name: 'id_type_offer' })
  idTypeOffer: number;

  @Column('varchar', { name: 'name', length: 150 })
  name: string;

  @Column('text', { name: 'description' })
  description: string;

  @Column('datetime', { name: 'date_open' })
  dateOpen: Date;

  @Column('datetime', { name: 'date_close' })
  dateClose: Date;

  @Column('enum', {
    name: 'status',
    nullable: true,
    enum: ['draft', 'active', 'closed', 'archived'],
    default: () => "'draft'",
  })
  status: 'draft' | 'active' | 'closed' | 'archived' | null;

  @Column('int', { name: 'id_provider' })
  idProvider: number;

  @Column('int', { name: 'user_create_id' })
  userCreateId: number;

  @Column('int', { name: 'user_update_id', nullable: true })
  userUpdateId: number | null;

  @Column('datetime', {
    name: 'date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateCreate: Date;

  @Column('datetime', { name: 'date_update', nullable: true })
  dateUpdate: Date | null;

  @Column('tinyint', { name: 'is_deleted', width: 1, default: () => "'0'" })
  isDeleted: boolean;

  @ManyToOne(() => NProvider, (nProvider) => nProvider.nOffers, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_provider', referencedColumnName: 'idProvider' }])
  idProvider2: NProvider;

  @ManyToOne(() => NTypeOffer, (nTypeOffer) => nTypeOffer.nOffers, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_type_offer', referencedColumnName: 'idTypeOffer' }])
  idTypeOffer2: NTypeOffer;

  @ManyToOne(() => NUser, (nUser) => nUser.nOffers, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_create_id', referencedColumnName: 'idUser' }])
  userCreate: NUser;

  @ManyToOne(() => NUser, (nUser) => nUser.nOffers2, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_update_id', referencedColumnName: 'idUser' }])
  userUpdate: NUser;
}
