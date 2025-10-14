import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_attachment_petition", ["idPetition"], {})
@Index("idx_attachment_user_create", ["idUserCreate"], {})
@Index("idx_attachment_user_update", ["idUserUpdate"], {})
@Entity("n_petition_attachment", { schema: "ies9021_coco" })
export class NPetitionAttachment {
  @PrimaryGeneratedColumn({ type: "int", name: "id_petition_attachment" })
  idPetitionAttachment: number;

  @Column("int", { name: "id_petition" })
  idPetition: number;

  @Column("varchar", { name: "url", length: 500 })
  url: string;

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
