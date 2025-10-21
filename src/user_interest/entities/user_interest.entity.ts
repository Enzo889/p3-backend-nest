import { Category } from 'src/entities/entities/category.entity';
import { NCategory } from 'src/entities/entities/ncategory.entity';
import { User } from 'src/entities/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity('user_interest', { schema: 'ies9021_coco' })
export class UserInterest {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_user_interest' })
  idUserInterest: number;

  @Column('int', { name: 'id_user' })
  idUser: number;

  @Column('int', { name: 'id_category' })
  idCategory: number;

  // 🔹 Relaciones
  @ManyToOne(() => User, (user) => user.userInterests, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_user', referencedColumnName: 'idUser' }])
  user: User;

  @ManyToOne(() => NCategory, (category) => category.userInterests, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_category', referencedColumnName: 'idCategory' }])
  category: Category;
}
