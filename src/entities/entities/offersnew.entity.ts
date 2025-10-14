import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("offers_new", { schema: "ies9021_coco" })
export class OffersNew {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "image", length: 255 })
  image: string;

  @Column("varchar", { name: "stock", length: 255 })
  stock: string;

  @Column("double", { name: "price", precision: 22 })
  price: number;

  @Column("int", { name: "discount", nullable: true })
  discount: number | null;

  @Column("varchar", { name: "installments", nullable: true, length: 255 })
  installments: string | null;

  @Column("varchar", { name: "shipping", nullable: true, length: 255 })
  shipping: string | null;

  @Column("varchar", { name: "description", length: 1000 })
  description: string;

  @Column("varchar", { name: "category", length: 255 })
  category: string;

  @Column("varchar", { name: "condition", length: 255 })
  condition: string;

  @Column("varchar", { name: "seller", length: 255 })
  seller: string;

  @Column("varchar", { name: "location", length: 255 })
  location: string;

  @Column("int", { name: "category_id" })
  categoryId: number;

  @Column("bit", { name: "is_owner" })
  isOwner: boolean;
}
