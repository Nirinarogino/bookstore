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
import { IsNotEmpty, IsString } from "class-validator";
import { demande } from "src/enums/borrowed-demande.enums";

@Index("BorrowedId", ["borrowedId"])
@Entity("BorrowedBook", { schema: "DATABOOK" })
export class BorrowedBook {
  @PrimaryGeneratedColumn({ type: "int", name: "BorrowedId" })
  borrowedId: number;

  @Column("date", { name: "BorrowedDate" })
  borrowedDate: Date;

  @Column("date", { name: "GiveBakcDate" })
  giveBakcDate: Date;
  
  @Column({type:'enum', enum: demande, default: demande.loading})
  demande: demande;

  @OneToOne(()=> Books)
  @JoinColumn()
  @IsNotEmpty()
  book: Books
  

  @ManyToOne(()=> User)
  @JoinColumn()
  @IsNotEmpty()
  user: User
}
