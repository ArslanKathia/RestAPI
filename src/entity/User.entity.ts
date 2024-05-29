import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { MembershipUser } from "./MembershipUser";

@Entity({name :"users"})
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false})
    name:string;

    @Column({nullable:false})
    email:string;

    @Column({nullable:false})
    password:string;

    @Column({ default: "users"})
    role: string;

    @Column({nullable: true})
    profileImage: string; // new field for user profile image

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(()=> MembershipUser, (membershipUser)=>membershipUser.user)
    membershipUsers : MembershipUser[];
    
}
