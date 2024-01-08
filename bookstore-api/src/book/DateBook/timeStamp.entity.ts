import { Column, CreateDateColumn, DeleteDateColumn } from "typeorm";

export class  timeStampEntity {
    @CreateDateColumn({update: false})
    addDate: Date;
  
    @DeleteDateColumn({update: false})
    deleteDate: Date;

    @Column("varchar", { name: "PublicationDAte" })
    PublicationDAte: Date;
}