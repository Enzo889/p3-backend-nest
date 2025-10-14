import { Column, Entity, Index } from "typeorm";

@Index("fk_lenguaje_component", ["idComponent"], {})
@Entity("language", { schema: "ies9021_coco" })
export class Language {
  @Column("int", { primary: true, name: "id_lenguaje" })
  idLenguaje: number;

  @Column("int", { name: "id_component" })
  idComponent: number;

  @Column("varchar", { name: "value_es", length: 255 })
  valueEs: string;

  @Column("varchar", { name: "value_en", length: 255 })
  valueEn: string;

  @Column("int", { name: "id_user_create", nullable: true })
  idUserCreate: number | null;

  @Column("int", { name: "id_user_update", nullable: true })
  idUserUpdate: number | null;

  @Column("datetime", { name: "date_create", nullable: true })
  dateCreate: Date | null;

  @Column("datetime", { name: "date_update", nullable: true })
  dateUpdate: Date | null;
}
