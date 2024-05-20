import {  Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { MembershipPackage } from "./MembershipPackage";

@Entity({ name: "membership_feature"})
export class MembershipFeatures {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'timestamp', default:()=>'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default:()=>'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;


    @ManyToOne(()=> MembershipPackage, (membershipPackage) => membershipPackage.membershipFeatures,{
        onDelete: 'CASCADE'
   })
    membershipPackage : MembershipPackage;

}
