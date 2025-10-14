import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_petition_type_petition", ["idTypePetition"], {})
@Index("idx_petition_customer", ["idCustomer"], {})
@Index("idx_petition_profession", ["idProfession"], {})
@Index("idx_petition_type_provider", ["idTypeProvider"], {})
@Index("idx_petition_state", ["idState"], {})
@Index("idx_petition_user_create", ["idUserCreate"], {})
@Index("idx_petition_user_update", ["idUserUpdate"], {})
@Entity("n_petition", { schema: "ies9021_coco" })
export class NPetition {
  @PrimaryGeneratedColumn({ type: "int", name: "id_petition" })
  idPetition: number;

  @Column("int", { name: "id_type_petition" })
  idTypePetition: number;

  @Column("int", { name: "id_customer" })
  idCustomer: number;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("int", { name: "id_profession", nullable: true })
  idProfession: number | null;

  @Column("int", { name: "id_type_provider", nullable: true })
  idTypeProvider: number | null;

  @Column("int", { name: "id_state", nullable: true, default: () => "'3'" })
  idState: number | null;

  @Column("date", { name: "date_since", nullable: true })
  dateSince: string | null;

  @Column("date", { name: "date_until", nullable: true })
  dateUntil: string | null;

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

  @Column("tinyint", { name: "is_deleted", width: 1, default: () => "'0'" })
  isDeleted: boolean;
}
