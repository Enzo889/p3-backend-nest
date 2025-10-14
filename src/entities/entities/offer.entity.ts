import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TypeProvider } from "./typeprovider.entity";

@Index("fk_type_provider_idx", ["idTypeOffer"], {})
@Entity("offer", { schema: "ies9021_coco" })
export class Offer {
  @PrimaryGeneratedColumn({ type: "int", name: "id_offer" })
  idOffer: number;

  @Column("int", { name: "id_type_offer" })
  idTypeOffer: number;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("datetime", { name: "date_open" })
  dateOpen: Date;

  @Column("datetime", { name: "date_close" })
  dateClose: Date;

  @Column("varchar", { name: "description", length: 1000 })
  description: string;

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

  @ManyToOne(() => TypeProvider, (typeProvider) => typeProvider.offers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "id_type_offer", referencedColumnName: "idTypeProvider" },
  ])
  idTypeOffer2: TypeProvider;
}
