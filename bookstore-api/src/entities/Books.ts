import { IsOptional } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("BookID", ["bookId"], { unique: true })
@Entity("Books", { schema: "DATABOOK" })
export class Books {
  @PrimaryGeneratedColumn({ type: "int", name: "BookID" })
  bookId: number;

  @Column("varchar", { name: "Title", length: 100 })
  title: string;

  @Column("varchar", { name: "Author", length: 100 })
  author: string;

  @Column("varchar", { name: "Publisher", length: 100 })
  publisher: string;

  @Column("text", { name: "Description"})
  @IsOptional()
  description: string;

  @Column("varchar", { name: "Category", length: 50 })
  category: string;

  @Column("varchar", { name: "Language", length: 20 })
  language: string;

  @Column("varchar", { name: "AvailabilityStatus", length: 50 })
  availabilityStatus: string;

  @Column("varchar", { name: "CoverPath", length: 255 })
  coverPath: string;

  @Column("date", { name: "PublicationDAte" })
  publicationDAte: Date;

  @Column("date", { name: "AddDate" })
  @CreateDateColumn({update: false})
  addDate: Date;

  @DeleteDateColumn({update: false})
  @Column("date", { name: "DeleteDate" })
  deleteDate: Date;
}
