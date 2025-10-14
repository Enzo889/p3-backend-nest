import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("module", { schema: "ies9021_coco" })
export class Module {
  @PrimaryGeneratedColumn({ type: "int", name: "idmodule" })
  idmodule: number;

  @Column("varchar", { name: "name_module", nullable: true, length: 45 })
  nameModule: string | null;

  @Column("varchar", { name: "description", nullable: true, length: 45 })
  description: string | null;

  @Column("varchar", { name: "security", nullable: true, length: 45 })
  security: string | null;

  @Column("varchar", { name: "administration", nullable: true, length: 45 })
  administration: string | null;

  @Column("varchar", { name: "commercial", nullable: true, length: 45 })
  commercial: string | null;

  @Column("varchar", { name: "marketing", nullable: true, length: 45 })
  marketing: string | null;

  @Column("timestamp", { name: "id_user_create", nullable: true })
  idUserCreate: Date | null;

  @Column("timestamp", { name: "id_user_update", nullable: true })
  idUserUpdate: Date | null;

  @Column("timestamp", { name: "date_create", nullable: true })
  dateCreate: Date | null;

  @Column("timestamp", { name: "date_update", nullable: true })
  dateUpdate: Date | null;
}
