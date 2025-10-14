import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Petition } from './petition.entity';

@Entity('type_petition', { schema: 'ies9021_coco' })
export class TypePetition {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_type_petition' })
  idTypePetition: number;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

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

  @OneToMany(() => Petition, (petition) => petition.idTypePetition2)
  petitions: Petition[];
}
