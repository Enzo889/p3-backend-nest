import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("forms", { schema: "ies9021_coco" })
export class Forms {
  @PrimaryGeneratedColumn({ type: "int", name: "id_forms" })
  idForms: number;

  @Column("varchar", { name: "name", nullable: true, length: 50 })
  name: string | null;

  @Column("int", { name: "id_user_update", nullable: true })
  idUserUpdate: number | null;

  @Column("int", { name: "id_user_create", nullable: true })
  idUserCreate: number | null;

  @Column("timestamp", {
    name: "date_create",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateCreate: Date;

  @Column("timestamp", {
    name: "date_update",
    nullable: true,
    default: () => "'0000-00-00 00:00:00'",
  })
  dateUpdate: Date | null;
}
