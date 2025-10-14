import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NPostulationStateHistory } from "./npostulationstatehistory.entity";
import { NPostulation } from "./npostulation.entity";

@Entity("n_postulation_state", { schema: "ies9021_coco" })
export class NPostulationState {
  @PrimaryGeneratedColumn({ type: "int", name: "id_state" })
  idState: number;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description: string | null;

  @OneToMany(
    () => NPostulationStateHistory,
    (nPostulationStateHistory) => nPostulationStateHistory.idState2
  )
  nPostulationStateHistories: NPostulationStateHistory[];

  @OneToMany(() => NPostulation, (nPostulation) => nPostulation.idState2)
  nPostulations: NPostulation[];
}
