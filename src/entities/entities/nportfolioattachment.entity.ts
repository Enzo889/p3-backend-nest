import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Portfolio } from "./portfolio.entity";

@Index("fk_n_portfolio_attachment_portfolio", ["idPortfolio"], {})
@Entity("n_portfolio_attachment", { schema: "ies9021_coco" })
export class NPortfolioAttachment {
  @PrimaryGeneratedColumn({ type: "int", name: "id_attachment" })
  idAttachment: number;

  @Column("int", { name: "id_portfolio" })
  idPortfolio: number;

  @Column("varchar", { name: "file_name", length: 255 })
  fileName: string;

  @Column("varchar", { name: "file_path", length: 500 })
  filePath: string;

  @Column("enum", {
    name: "file_type",
    enum: ["image", "video", "document", "other"],
  })
  fileType: "image" | "video" | "document" | "other";

  @Column("varchar", { name: "mime_type", nullable: true, length: 100 })
  mimeType: string | null;

  @Column("bigint", { name: "file_size", nullable: true })
  fileSize: string | null;

  @Column("timestamp", {
    name: "uploaded_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  uploadedAt: Date;

  @Column("int", { name: "id_user_upload", nullable: true })
  idUserUpload: number | null;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.nPortfolioAttachments, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_portfolio", referencedColumnName: "idPortfolio" }])
  idPortfolio2: Portfolio;
}
