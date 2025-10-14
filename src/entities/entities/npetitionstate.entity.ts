import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("n_petition_state", { schema: "ies9021_coco" })
export class NPetitionState {
  @PrimaryGeneratedColumn({ type: "int", name: "id_state" })
  idState: number;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description: string | null;
}
