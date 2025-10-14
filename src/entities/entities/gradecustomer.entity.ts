import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("grade_customer", { schema: "ies9021_coco" })
export class GradeCustomer {
  @PrimaryGeneratedColumn({ type: "bigint", name: "idGradeCustomer" })
  idGradeCustomer: string;

  @Column("datetime", { name: "date_create", nullable: true })
  dateCreate: Date | null;

  @Column("datetime", { name: "date_update", nullable: true })
  dateUpdate: Date | null;

  @Column("bigint", { name: "id_user_create", nullable: true })
  idUserCreate: string | null;

  @Column("bigint", { name: "id_user_update", nullable: true })
  idUserUpdate: string | null;

  @Column("varchar", { name: "comment", nullable: true, length: 500 })
  comment: string | null;

  @Column("bigint", { name: "id_customer" })
  idCustomer: string;

  @Column("bigint", { name: "id_grade" })
  idGrade: string;
}
