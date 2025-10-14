import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_statehistory_petition", ["idPetition"], {})
@Index("idx_statehistory_state", ["idState"], {})
@Index("idx_statehistory_user", ["changedByUserId"], {})
@Entity("n_petition_state_history", { schema: "ies9021_coco" })
export class NPetitionStateHistory {
  @PrimaryGeneratedColumn({ type: "int", name: "id_petition_state_history" })
  idPetitionStateHistory: number;

  @Column("int", { name: "id_petition" })
  idPetition: number;

  @Column("int", { name: "id_state" })
  idState: number;

  @Column("int", { name: "changed_by_user_id" })
  changedByUserId: number;

  @Column("varchar", { name: "note", nullable: true, length: 255 })
  note: string | null;

  @Column("timestamp", {
    name: "change_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  changeDate: Date;
}
