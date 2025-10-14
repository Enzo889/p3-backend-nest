import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Petition } from "./petition.entity";

@Index("fk_attach_petition", ["idPetition"], {})
@Entity("petition_attachment", { schema: "ies9021_coco" })
export class PetitionAttachment {
  @PrimaryGeneratedColumn({ type: "int", name: "id_petition_attachment" })
  idPetitionAttachment: number;

  @Column("int", { name: "id_petition" })
  idPetition: number;

  @Column("varchar", { name: "url", length: 500 })
  url: string;

  @Column("varchar", { name: "type", length: 50 })
  type: string;

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

  @ManyToOne(() => Petition, (petition) => petition.petitionAttachments, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_petition", referencedColumnName: "idPetition" }])
  idPetition2: Petition;
}
