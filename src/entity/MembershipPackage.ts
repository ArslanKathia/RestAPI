import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { MembershipUser } from "./MembershipUser";
import { MembershipFeatures } from "./MembershipFeatures";

@Entity({ name: "membership_package"})
export class MembershipPackage {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: "decimal", precision:10, scale:2})
    price: number;

    @Column()
    durations: number;

    @Column({ default: true})
    isActive: boolean;

    @Column({ type: 'timestamp', default:()=> 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({ type: 'timestamp', default:()=> 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;


    @OneToMany(()=> MembershipUser, (membershipUser)=> membershipUser.membershipPackage)
    membershipUsers : MembershipUser[];


    @OneToMany(()=> MembershipFeatures, (membershipFeature) => membershipFeature.membershipPackage)
    membershipFeatures: MembershipFeatures[];;

}
