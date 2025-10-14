import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_type_petition_user_create", ["idUserCreate"], {})
@Index("idx_type_petition_user_update", ["idUserUpdate"], {})
@Entity("n_type_petition", { schema: "ies9021_coco" })
export class NTypePetition {
  @PrimaryGeneratedColumn({ type: "int", name: "id_type_petition" })
  idTypePetition: number;

  @Column("varchar", { name: "type_petition", length: 100 })
  typePetition: string;

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
