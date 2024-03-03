import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Books } from "./Books";
import { User } from "./User";

@Index("BorrowedId", ["borrowedId"], { unique: true })
@Entity("BorrowedBook", { schema: "DATABOOK" })
export class BorrowedBook extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "BorrowedId" })
  borrowedId: number;

  @Column("datetime", { name: "BorrowedDate" })
  borrowedDate: Date;

  @Column("datetime", { name: "GiveBakcDate" })
  giveBakcDate: Date;

  @OneToOne(()=> Books)
  @JoinColumn()
  book: Books

  @OneToOne(()=> User)
  @JoinColumn()
  user: User

}
