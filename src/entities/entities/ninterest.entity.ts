import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { NCustomer } from "./ncustomer.entity";
import { NCategory } from "./ncategory.entity";

@Index("id_customer", ["idCustomer"], {})
@Index("id_category", ["idCategory"], {})
@Entity("n_interest", { schema: "ies9021_coco" })
export class NInterest {
  @PrimaryGeneratedColumn({ type: "int", name: "id_interest" })
  idInterest: number;

  @Column("int", { name: "id_customer" })
  idCustomer: number;

  @Column("int", { name: "id_category" })
  idCategory: number;

  @Column("int", { name: "id_user_create", nullable: true })
  idUserCreate: number | null;

  @Column("int", { name: "id_user_update", nullable: true })
  idUserUpdate: number | null;

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

  @Column("tinyint", {
    name: "is_deleted",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isDeleted: boolean | null;

  @ManyToOne(() => NCustomer, (nCustomer) => nCustomer.nInterests, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_customer", referencedColumnName: "idCustomer" }])
  idCustomer2: NCustomer;

  @ManyToOne(() => NCategory, (nCategory) => nCategory.nInterests, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_category", referencedColumnName: "idCategory" }])
  idCategory2: NCategory;
}
