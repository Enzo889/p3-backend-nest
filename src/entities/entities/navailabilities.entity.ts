import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { NProvider } from "./nprovider.entity";

@Index("id_provider", ["idProvider"], {})
@Entity("n_availabilities", { schema: "ies9021_coco" })
export class NAvailabilities {
  @PrimaryGeneratedColumn({ type: "int", name: "id_availability" })
  idAvailability: number;

  @Column("int", { name: "id_provider" })
  idProvider: number;

  @Column("tinyint", { name: "day_of_week" })
  dayOfWeek: number;

  @Column("time", { name: "start_time" })
  startTime: string;

  @Column("time", { name: "end_time" })
  endTime: string;

  @ManyToOne(() => NProvider, (nProvider) => nProvider.nAvailabilities, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_provider", referencedColumnName: "idProvider" }])
  idProvider2: NProvider;
}
