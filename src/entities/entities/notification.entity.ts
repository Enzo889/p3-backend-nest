import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customer } from "./customer.entity";
import { NotificationHistory } from "./notificationhistory.entity";

@Index("fk_notification_provider", ["idProvider"], {})
@Index("id_customer", ["idCustomer"], {})
@Entity("notification", { schema: "ies9021_coco" })
export class Notification {
  @PrimaryGeneratedColumn({ type: "int", name: "id_notification" })
  idNotification: number;

  @Column("int", { name: "id_provider", nullable: true })
  idProvider: number | null;

  @Column("int", { name: "id_customer", nullable: true })
  idCustomer: number | null;

  @Column("varchar", { name: "type", nullable: true, length: 255 })
  type: string | null;

  @Column("text", { name: "message", nullable: true })
  message: string | null;

  @Column("tinyint", { name: "viewed", nullable: true, width: 1 })
  viewed: boolean | null;

  @Column("int", { name: "id_user_update", nullable: true })
  idUserUpdate: number | null;

  @Column("int", { name: "id_user_create", nullable: true })
  idUserCreate: number | null;

  @Column("timestamp", {
    name: "date_update",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  dateUpdate: Date | null;

  @Column("timestamp", {
    name: "date_create",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  dateCreate: Date | null;

  @Column("tinyint", { name: "deleted", nullable: true, width: 1 })
  deleted: boolean | null;

  @ManyToOne(() => Customer, (customer) => customer.notifications, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_customer", referencedColumnName: "idCustomer" }])
  idCustomer2: Customer;

  @OneToMany(
    () => NotificationHistory,
    (notificationHistory) => notificationHistory.idNotification2
  )
  notificationHistories: NotificationHistory[];
}
