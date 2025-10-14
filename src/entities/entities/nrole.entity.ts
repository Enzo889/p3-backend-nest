import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NUser } from './nuser.entity';

@Index('name', ['name'], { unique: true })
@Entity('n_role', { schema: 'ies9021_coco' })
export class NRole {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_role' })
  idRole: number;

  @Column('varchar', { name: 'name', unique: true, length: 50 })
  name: string;

  @ManyToMany(() => NUser, (nUser) => nUser.nRoles)
  nUsers: NUser[];
}
