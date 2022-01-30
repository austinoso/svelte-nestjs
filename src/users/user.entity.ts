import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import bcrypt from "bcrypt";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  passwordHash: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}