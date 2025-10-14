import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("id_inventory", ["idInventory"], {})
@Index("id_interest_history", ["idInterestHistory"], {})
@Entity("inventory_has_interest_history", { schema: "ies9021_coco" })
export class InventoryHasInterestHistory {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_inventory_has_interest_history",
  })
  idInventoryHasInterestHistory: number;

  @Column("int", { name: "id_inventory", nullable: true })
  idInventory: number | null;

  @Column("int", { name: "id_interest_history", nullable: true })
  idInterestHistory: number | null;

  @Column("datetime", { name: "date_create", nullable: true })
  dateCreate: Date | null;

  @Column("datetime", { name: "date_update", nullable: true })
  dateUpdate: Date | null;

  @Column("bigint", { name: "id_user_create", nullable: true })
  idUserCreate: string | null;

  @Column("bigint", { name: "id_user_update", nullable: true })
  idUserUpdate: string | null;
}
