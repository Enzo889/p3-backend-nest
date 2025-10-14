import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NProvider } from './nprovider.entity';
import { NCategory } from './ncategory.entity';

@Index('provider_id', ['providerId'], {})
@Index('category_id', ['categoryId'], {})
@Entity('n_provider_cateogory', { schema: 'ies9021_coco' })
export class NProviderCateogory {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'provider_id' })
  providerId: number;

  @Column('int', { name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => NProvider, (nProvider) => nProvider.nProviderCateogories, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'provider_id', referencedColumnName: 'idProvider' }])
  provider: NProvider;

  @ManyToOne(() => NCategory, (nCategory) => nCategory.nProviderCateogories, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'idCategory' }])
  category: NCategory;
}
