import { isNotEmpty } from "class-validator";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Books } from "./Books";

export class BorrowedBook{
    @PrimaryGeneratedColumn()
    borrowedBookId: number;

    @Column()
    DateBorrowed: Date;

    @Column()
    giveBackDate: Date;
   
    // @ManyToOne((type)=> (books), Books.BorrowedBook)
    // books: Books;
}