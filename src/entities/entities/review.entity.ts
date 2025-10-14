import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Petition } from "./petition.entity";
import { Provider } from "./provider.entity";

@Index("fk_review_petition", ["idPetition"], {})
@Index("fk_review_provider", ["idProvider"], {})
@Entity("review", { schema: "ies9021_coco" })
export class Review {
  @PrimaryGeneratedColumn({ type: "int", name: "id_review" })
  idReview: number;

  @Column("int", { name: "id_petition" })
  idPetition: number;

  @Column("int", { name: "id_provider", unsigned: true })
  idProvider: number;

  @Column("int", { name: "rating" })
  rating: number;

  @Column("text", { name: "comment", nullable: true })
  comment: string | null;

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

  @ManyToOne(() => Petition, (petition) => petition.reviews, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_petition", referencedColumnName: "idPetition" }])
  idPetition2: Petition;

  @ManyToOne(() => Provider, (provider) => provider.reviews, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_provider", referencedColumnName: "idProvider" }])
  idProvider2: Provider;
}
