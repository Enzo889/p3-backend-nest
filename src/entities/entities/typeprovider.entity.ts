import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Provider } from "./provider.entity";
import { Offer } from "./offer.entity";

@Index("id_user_create_idx", ["idUserCreate"], {})
@Index("id_user_update_idx", ["idUserUpdate"], {})
@Entity("type_provider", { schema: "ies9021_coco" })
export class TypeProvider {
  @PrimaryGeneratedColumn({ type: "int", name: "id_type_provider" })
  idTypeProvider: number;

  @Column("varchar", { name: "type", length: 70 })
  type: string;

  @Column("tinyint", { name: "business", nullable: true, width: 1 })
  business: boolean | null;

  @Column("tinyint", { name: "transport", nullable: true, width: 1 })
  transport: boolean | null;

  @Column("int", { name: "id_user_create" })
  idUserCreate: number;

  @Column("int", { name: "id_user_update" })
  idUserUpdate: number;

  @Column("timestamp", {
    name: "date_create",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateCreate: Date;

  @Column("timestamp", {
    name: "date_update",
    default: () => "'0000-00-00 00:00:00'",
  })
  dateUpdate: Date;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @OneToMany(() => Provider, (provider) => provider.typeProvider)
  providers: Provider[];

  @OneToMany(() => Provider, (provider) => provider.idTypeProvider2)
  providers2: Provider[];

  @OneToMany(() => Offer, (offer) => offer.idTypeOffer2)
  offers: Offer[];
}
