import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("security_profile_group", { schema: "ies9021_coco" })
export class SecurityProfileGroup {
  @PrimaryGeneratedColumn({ type: "int", name: "id_segurity_profile_group" })
  idSegurityProfileGroup: number;

  @Column("varchar", { name: "id_profile", nullable: true, length: 45 })
  idProfile: string | null;

  @Column("varchar", { name: "id_module", nullable: true, length: 45 })
  idModule: string | null;

  @Column("varchar", { name: "name", nullable: true, length: 45 })
  name: string | null;

  @Column("varchar", { name: "id_user_create", nullable: true, length: 45 })
  idUserCreate: string | null;

  @Column("int", { name: "id_user_update" })
  idUserUpdate: number;

  @Column("varchar", { name: "date_create", nullable: true, length: 45 })
  dateCreate: string | null;

  @Column("varchar", { name: "date_update", nullable: true, length: 45 })
  dateUpdate: string | null;
}
