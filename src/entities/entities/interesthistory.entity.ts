import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Interest } from "./interest.entity";

@Index("id_user_update", ["idUserUpdate"], {})
@Index("id_user_create", ["idUserCreate"], {})
@Index("fk_interest_history_1", ["idInterest"], {})
@Entity("interest_history", { schema: "ies9021_coco" })
export class InterestHistory {
  @PrimaryGeneratedColumn({ type: "int", name: "id_interest_history" })
  idInterestHistory: number;

  @Column("varchar", { name: "name", nullable: true, length: 40 })
  name: string | null;

  @Column("int", { name: "id_interest", nullable: true })
  idInterest: number | null;

  @Column("int", { name: "id_user_update", nullable: true })
  idUserUpdate: number | null;

  @Column("int", { name: "id_user_create", nullable: true })
  idUserCreate: number | null;

  @Column("datetime", { name: "date_create", nullable: true })
  dateCreate: Date | null;

  @Column("datetime", { name: "date_update", nullable: true })
  dateUpdate: Date | null;

  @ManyToOne(() => Interest, (interest) => interest.interestHistories, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_interest", referencedColumnName: "idInterest" }])
  idInterest2: Interest;
}
