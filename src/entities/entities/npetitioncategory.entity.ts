import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_petition_category_petition", ["idPetition"], {})
@Index("idx_petition_category_category", ["idCategory"], {})
@Entity("n_petition_category", { schema: "ies9021_coco" })
export class NPetitionCategory {
  @PrimaryGeneratedColumn({ type: "int", name: "id_petition_category" })
  idPetitionCategory: number;

  @Column("int", { name: "id_petition" })
  idPetition: number;

  @Column("int", { name: "id_category" })
  idCategory: number;
}
