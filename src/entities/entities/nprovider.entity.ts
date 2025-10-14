import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { NUser } from "./nuser.entity";
import { NTypeProvider } from "./ntypeprovider.entity";
import { NProfession } from "./nprofession.entity";
import { NAddress } from "./naddress.entity";
import { NProviderCateogory } from "./nprovidercateogory.entity";
import { NCity } from "./ncity.entity";
import { NOffers } from "./noffers.entity";
import { NMaterial } from "./nmaterial.entity";
import { NAvailabilities } from "./navailabilities.entity";

@Index("user_id", ["userId"], { unique: true })
@Index("id_type_provider", ["idTypeProvider"], {})
@Index("id_profession", ["idProfession"], {})
@Index("address_id", ["addressId"], {})
@Entity("n_provider", { schema: "ies9021_coco" })
export class NProvider {
  @PrimaryGeneratedColumn({ type: "int", name: "id_provider" })
  idProvider: number;

  @Column("int", { name: "user_id", unique: true })
  userId: number;

  @Column("int", { name: "id_type_provider", nullable: true })
  idTypeProvider: number | null;

  @Column("int", { name: "id_profession", nullable: true })
  idProfession: number | null;

  @Column("int", { name: "address_id", nullable: true })
  addressId: number | null;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @OneToOne(() => NUser, (nUser) => nUser.nProvider, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "idUser" }])
  user: NUser;

  @ManyToOne(() => NTypeProvider, (nTypeProvider) => nTypeProvider.nProviders, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([
    { name: "id_type_provider", referencedColumnName: "idTypeProvider" },
  ])
  idTypeProvider2: NTypeProvider;

  @ManyToOne(() => NProfession, (nProfession) => nProfession.nProviders, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_profession", referencedColumnName: "idProfession" }])
  idProfession2: NProfession;

  @ManyToOne(() => NAddress, (nAddress) => nAddress.nProviders, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "address_id", referencedColumnName: "idAddress" }])
  address: NAddress;

  @OneToMany(
    () => NProviderCateogory,
    (nProviderCateogory) => nProviderCateogory.provider
  )
  nProviderCateogories: NProviderCateogory[];

  @ManyToMany(() => NCity, (nCity) => nCity.nProviders)
  @JoinTable({
    name: "n_provider_city",
    joinColumns: [{ name: "id_provider", referencedColumnName: "idProvider" }],
    inverseJoinColumns: [{ name: "id_city", referencedColumnName: "idCity" }],
    schema: "ies9021_coco",
  })
  nCities: NCity[];

  @OneToMany(() => NOffers, (nOffers) => nOffers.idProvider2)
  nOffers: NOffers[];

  @OneToMany(() => NMaterial, (nMaterial) => nMaterial.idProvider2)
  nMaterials: NMaterial[];

  @OneToMany(
    () => NAvailabilities,
    (nAvailabilities) => nAvailabilities.idProvider2
  )
  nAvailabilities: NAvailabilities[];
}
