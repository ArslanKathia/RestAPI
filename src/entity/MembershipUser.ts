import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User.entity";
import { MembershipPackage } from "./MembershipPackage";

@Entity({ name: "membership_user"})
export class MembershipUser {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'timestamp'})
    startDate: Date;

    @Column({ type: 'timestamp'})
    endDate: Date;
    
    @Column({ default: true})
    isActive: boolean;

    @Column({ type: 'timestamp', default: ()=>'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({ type: 'timestamp', default:()=> 'CURRENT_TIMESTAMP',onUpdate:'CURRENT_TIMESTAMP'})
    updatedAt: Date;


    @ManyToOne(()=> User, (user) => user.membershipUsers)
    user: User;

    @ManyToOne(()=> MembershipPackage, (membershipPackage) => membershipPackage.membershipUsers)
    membershipPackage: MembershipPackage;

}
