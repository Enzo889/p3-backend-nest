import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { NPostulation } from "./npostulation.entity";

@Index("id_postulation", ["idPostulation"], {})
@Entity("n_postulation_budget", { schema: "ies9021_coco" })
export class NPostulationBudget {
  @PrimaryGeneratedColumn({ type: "int", name: "id_budget" })
  idBudget: number;

  @Column("int", { name: "id_postulation" })
  idPostulation: number;

  @Column("enum", {
    name: "cost_type",
    enum: [
      "por_hora",
      "por_proyecto",
      "por_item",
      "material",
      "servicio",
      "mixto",
    ],
    default: () => "'por_proyecto'",
  })
  costType:
    | "por_hora"
    | "por_proyecto"
    | "por_item"
    | "material"
    | "servicio"
    | "mixto";

  @Column("decimal", {
    name: "amount",
    nullable: true,
    precision: 15,
    scale: 2,
  })
  amount: string | null;

  @Column("decimal", {
    name: "unit_price",
    nullable: true,
    precision: 15,
    scale: 2,
  })
  unitPrice: string | null;

  @Column("int", { name: "quantity", nullable: true })
  quantity: number | null;

  @Column("decimal", { name: "hours", nullable: true, precision: 10, scale: 2 })
  hours: string | null;

  @Column("varchar", { name: "item_description", nullable: true, length: 255 })
  itemDescription: string | null;

  @Column("varchar", { name: "notes", nullable: true, length: 255 })
  notes: string | null;

  @Column("timestamp", {
    name: "date_created",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateCreated: Date;

  @Column("int", { name: "id_user_create", nullable: true })
  idUserCreate: number | null;

  @ManyToOne(
    () => NPostulation,
    (nPostulation) => nPostulation.nPostulationBudgets,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "id_postulation", referencedColumnName: "idPostulation" },
  ])
  idPostulation2: NPostulation;
}
