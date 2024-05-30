import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({name :"books"})
export class Book {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false})
    title:string;

    @Column({nullable:false})
    author:string;

    @Column({nullable:false})
    isbn:string;

    @Column({nullable: true})
    description:string;

    @Column({default: false})
    isRead: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}