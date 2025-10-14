import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("type_price", { schema: "ies9021_coco" })
export class TypePrice {
  @PrimaryGeneratedColumn({ type: "int", name: "id_type_price" })
  idTypePrice: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("tinyint", {
    name: "hour",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  hour: boolean | null;

  @Column("tinyint", {
    name: "work",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  work: boolean | null;

  @Column("tinyint", {
    name: "inventory",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  inventory: boolean | null;

  @Column("tinyint", {
    name: "transportation",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  transportation: boolean | null;

  @Column("int", { name: "id_user_create", nullable: true })
  idUserCreate: number | null;

  @Column("int", { name: "id_user_update", nullable: true })
  idUserUpdate: number | null;

  @Column("datetime", {
    name: "date_create",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  dateCreate: Date | null;

  @Column("datetime", {
    name: "date_update",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  dateUpdate: Date | null;
}
