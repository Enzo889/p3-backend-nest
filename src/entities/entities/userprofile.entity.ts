import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("user_id", ["userId"], {})
@Entity("user_profile", { schema: "ies9021_coco" })
export class UserProfile {
  @PrimaryGeneratedColumn({ type: "int", name: "id_profile" })
  idProfile: number;

  @Column("varchar", { name: "email", nullable: true, length: 150 })
  email: string | null;

  @Column("tinyint", {
    name: "is_admin",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isAdmin: boolean | null;

  @Column("varchar", { name: "role_type", nullable: true, length: 255 })
  roleType: string | null;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("int", { name: "id_user_create", nullable: true })
  idUserCreate: number | null;

  @Column("int", { name: "id_user_update", nullable: true })
  idUserUpdate: number | null;

  @Column("timestamp", {
    name: "date_create",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  dateCreate: Date | null;

  @Column("timestamp", {
    name: "date_update",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  dateUpdate: Date | null;
}
