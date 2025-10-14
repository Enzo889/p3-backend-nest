import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("profile", { schema: "ies9021_coco" })
export class Profile {
  @PrimaryGeneratedColumn({ type: "int", name: "id_profile" })
  idProfile: number;

  @Column("varchar", { name: "_name", nullable: true, length: 40 })
  name: string | null;

  @Column("int", { name: "_admin", nullable: true })
  admin: number | null;

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
    default: () => "CURRENT_TIMESTAMP",
  })
  dateUpdate: Date;
}
