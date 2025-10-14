import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Availability } from "./availability.entity";

@Index("fk_user_create", ["idUserCreate"], {})
@Index("fk_user_update", ["idUserUpdate"], {})
@Entity("hour", { schema: "ies9021_coco" })
export class Hour {
  @PrimaryGeneratedColumn({ type: "int", name: "id_hour" })
  idHour: number;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("varchar", { name: "id_user_create", nullable: true, length: 45 })
  idUserCreate: string | null;

  @Column("varchar", { name: "id_user_update", nullable: true, length: 45 })
  idUserUpdate: string | null;

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

  @OneToMany(() => Availability, (availability) => availability.idFromHour2)
  availabilities: Availability[];

  @OneToMany(() => Availability, (availability) => availability.idUntilHour2)
  availabilities2: Availability[];
}
