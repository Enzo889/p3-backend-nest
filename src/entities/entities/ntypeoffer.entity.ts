import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NOffers } from './noffers.entity';
import { NUser } from './nuser.entity';

@Index('fk_type_offer_user_create', ['idUserCreate'], {})
@Index('fk_type_offer_user_update', ['idUserUpdate'], {})
@Entity('n_type_offer', { schema: 'ies9021_coco' })
export class NTypeOffer {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_type_offer' })
  idTypeOffer: number;

  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @Column('int', { name: 'id_user_create' })
  idUserCreate: number;

  @Column('int', { name: 'id_user_update', nullable: true })
  idUserUpdate: number | null;

  @Column('datetime', {
    name: 'date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateCreate: Date;

  @Column('datetime', { name: 'date_update', nullable: true })
  dateUpdate: Date | null;

  @OneToMany(() => NOffers, (nOffers) => nOffers.idTypeOffer2)
  nOffers: NOffers[];

  @ManyToOne(() => NUser, (nUser) => nUser.nTypeOffers, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_user_create', referencedColumnName: 'idUser' }])
  idUserCreate2: NUser;

  @ManyToOne(() => NUser, (nUser) => nUser.nTypeOffers2, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_user_update', referencedColumnName: 'idUser' }])
  idUserUpdate2: NUser;
}
