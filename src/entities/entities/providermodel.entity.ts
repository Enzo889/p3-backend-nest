import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("provider_model", { schema: "ies9021_coco" })
export class ProviderModel {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_provider" })
  idProvider: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("bigint", { name: "id_profession" })
  idProfession: string;
}
