import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { NProvider } from "./nprovider.entity";

@Index("name", ["name"], { unique: true })
@Entity("n_type_provider", { schema: "ies9021_coco" })
export class NTypeProvider {
  @PrimaryGeneratedColumn({ type: "int", name: "id_type_provider" })
  idTypeProvider: number;

  @Column("varchar", { name: "name", unique: true, length: 100 })
  name: string;

  @OneToMany(() => NProvider, (nProvider) => nProvider.idTypeProvider2)
  nProviders: NProvider[];
}
