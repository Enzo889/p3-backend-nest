import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("id_user", ["idUser"], {})
@Index("id_module", ["idModule"], {})
@Index("id_user_create", ["idUserCreate"], {})
@Index("id_user_update", ["idUserUpdate"], {})
@Entity("transaction", { schema: "ies9021_coco" })
export class Transaction {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_transaction",
    unsigned: true,
  })
  idTransaction: number;

  @Column("int", { name: "id_user", unsigned: true })
  idUser: number;

  @Column("int", { name: "id_module", unsigned: true })
  idModule: number;

  @Column("varchar", {
    name: "query_type",
    comment: "Type of query executed",
    length: 255,
  })
  queryType: string;

  @Column("varchar", {
    name: "old_value",
    comment: "Old value before the query",
    length: 255,
  })
  oldValue: string;

  @Column("varchar", {
    name: "new_value",
    comment: "New value after the query",
    length: 255,
  })
  newValue: string;

  @Column("int", { name: "id_user_create", nullable: true, unsigned: true })
  idUserCreate: number | null;

  @Column("int", { name: "id_user_update", nullable: true, unsigned: true })
  idUserUpdate: number | null;

  @Column("timestamp", {
    name: "date_create",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateCreate: Date;

  @Column("timestamp", {
    name: "date_update",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateUpdate: Date;
}
