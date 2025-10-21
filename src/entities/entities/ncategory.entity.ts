import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NProviderCateogory } from './nprovidercateogory.entity';
import { NInterest } from './ninterest.entity';
import { UserInterest } from '../../user_interest/entities/user_interest.entity';

@Index('name', ['name'], { unique: true })
@Entity('n_category', { schema: 'ies9021_coco' })
export class NCategory {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_category' })
  idCategory: number;

  @Column('varchar', { name: 'name', unique: true, length: 100 })
  name: string;

  @OneToMany(
    () => NProviderCateogory,
    (nProviderCateogory) => nProviderCateogory.category,
  )
  nProviderCateogories: NProviderCateogory[];

  @OneToMany(() => NInterest, (nInterest) => nInterest.idCategory2)
  nInterests: NInterest[];

  @OneToMany(() => UserInterest, (userInterest) => userInterest.category)
  userInterests: UserInterest[];
}
