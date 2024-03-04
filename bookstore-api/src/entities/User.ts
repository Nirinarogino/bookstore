import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("UserId", ["userId"], { unique: true })
@Index("FirstName", ["firstName"], { unique: true })
@Index("LastName", ["lastName"], { unique: true })
@Index("Email", ["email"], { unique: true })
@Entity("User", { schema: "DATABOOK" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "UserId" })
  userId: number;

  @Column("varchar", { name: "UserName", length: 20 })
  userName: string;

  @Column("varchar", { name: "FirstName", unique: true, length: 30 })
  firstName: string;

  @Column("varchar", { name: "LastName", unique: true, length: 30 })
  lastName: string;

  @Column("varchar", { name: "Email", unique: true, length: 50 })
  email: string;

  @Column("text", { name: "Password" })
  password: string;

  @Column("varchar", { name: "Role", length: 50 })
  role: string;

  @Column()
  salt: string;
}
