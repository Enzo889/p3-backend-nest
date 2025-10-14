import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { NPostulation } from "./npostulation.entity";
import { NMaterial } from "./nmaterial.entity";

@Index("id_postulation", ["idPostulation"], {})
@Index("id_material", ["idMaterial"], {})
@Entity("n_postulation_material", { schema: "ies9021_coco" })
export class NPostulationMaterial {
  @PrimaryGeneratedColumn({ type: "int", name: "id_postulation_material" })
  idPostulationMaterial: number;

  @Column("int", { name: "id_postulation" })
  idPostulation: number;

  @Column("int", { name: "id_material" })
  idMaterial: number;

  @Column("decimal", { name: "quantity", precision: 10, scale: 2 })
  quantity: string;

  @Column("decimal", { name: "unit_price", precision: 15, scale: 2 })
  unitPrice: string;

  @Column("decimal", { name: "total", nullable: true, precision: 15, scale: 2 })
  total: string | null;

  @Column("varchar", { name: "notes", nullable: true, length: 255 })
  notes: string | null;

  @ManyToOne(
    () => NPostulation,
    (nPostulation) => nPostulation.nPostulationMaterials,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "id_postulation", referencedColumnName: "idPostulation" },
  ])
  idPostulation2: NPostulation;

  @ManyToOne(() => NMaterial, (nMaterial) => nMaterial.nPostulationMaterials, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_material", referencedColumnName: "idMaterial" }])
  idMaterial2: NMaterial;
}
