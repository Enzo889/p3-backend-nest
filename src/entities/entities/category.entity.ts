import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Provider } from './provider.entity';
import { TypeOffer } from './typeoffer.entity';
import { Interest } from './interest.entity';

@Entity('category', { schema: 'ies9021_coco' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_category' })
  idCategory: number;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('int', { name: 'id_user_create', nullable: true })
  idUserCreate: number | null;

  @Column('int', { name: 'id_user_update', nullable: true })
  idUserUpdate: number | null;

  @Column('datetime', { name: 'date_create', nullable: true })
  dateCreate: Date | null;

  @Column('datetime', { name: 'date_update', nullable: true })
  dateUpdate: Date | null;

  @OneToMany(() => Provider, (provider) => provider.idCategory2)
  providers: Provider[];

  @OneToMany(() => TypeOffer, (typeOffer) => typeOffer.idCategory2)
  typeOffers: TypeOffer[];

  @OneToMany(() => Interest, (interest) => interest.idCategory2)
  interests: Interest[];
}
