import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("grade_provider", { schema: "ies9021_coco" })
export class GradeProvider {
  @PrimaryGeneratedColumn({ type: "int", name: "id_grade_provider" })
  idGradeProvider: number;

  @Column("int", { name: "id_provider" })
  idProvider: number;

  @Column("int", { name: "id_grade" })
  idGrade: number;

  @Column("varchar", { name: "coment", length: 255 })
  coment: string;

  @Column("int", { name: "id_user_update" })
  idUserUpdate: number;

  @Column("int", { name: "id_user_create" })
  idUserCreate: number;

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
}
