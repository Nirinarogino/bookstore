import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

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

  @Column("varchar", { name: "Description", length: 255 })
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
  publicationDAte: string;

  @Column("date", { name: "AddDate" })
  addDate: string;

  @Column("date", { name: "DeleteDate" })
  deleteDate: string;
}
