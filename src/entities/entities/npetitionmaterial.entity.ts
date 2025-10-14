import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_material_petition", ["idPetition"], {})
@Index("idx_material_article", ["idArticle"], {})
@Index("idx_material_user_create", ["idUserCreate"], {})
@Index("idx_material_user_update", ["idUserUpdate"], {})
@Entity("n_petition_material", { schema: "ies9021_coco" })
export class NPetitionMaterial {
  @PrimaryGeneratedColumn({ type: "int", name: "id_petition_material" })
  idPetitionMaterial: number;

  @Column("int", { name: "id_petition" })
  idPetition: number;

  @Column("int", { name: "id_article" })
  idArticle: number;

  @Column("int", { name: "quantity" })
  quantity: number;

  @Column("decimal", { name: "unit_price", precision: 10, scale: 2 })
  unitPrice: string;

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
