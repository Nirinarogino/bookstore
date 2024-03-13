import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Books } from "./Books";
import { User } from "./User";
import { IsNotEmpty } from "class-validator";

@Index("BorrowedId", ["borrowedId"])
@Entity("BorrowedBook", { schema: "DATABOOK" })
export class BorrowedBook {
  @PrimaryGeneratedColumn({ type: "int", name: "BorrowedId" })
  borrowedId: number;

  @Column("date", { name: "BorrowedDate" })
  borrowedDate: Date;

  @Column("date", { name: "GiveBakcDate" })
  giveBakcDate: Date;

  @OneToOne(()=> Books)
  @JoinColumn()
  @IsNotEmpty()
  book: Books
  
  @ManyToOne(()=> User)
  @JoinColumn()
  @IsNotEmpty()
  user: User
}
