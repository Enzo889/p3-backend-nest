import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("security_module_user", { schema: "ies9021_coco" })
export class SecurityModuleUser {
  @PrimaryGeneratedColumn({ type: "int", name: "id_security_module_user" })
  idSecurityModuleUser: number;

  @Column("int", { name: "id_form", nullable: true })
  idForm: number | null;

  @Column("varchar", { name: "state", nullable: true, length: 50 })
  state: string | null;

  @Column("int", { name: "id_user", nullable: true })
  idUser: number | null;

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
