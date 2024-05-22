import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { MembershipUser } from "../entity/MembershipUser";

export class MembershipUserController{
    static async getMembershipUsers( req: Request, res: Response){
        const membershipUserRepo = AppDataSource.getRepository(MembershipUser);
        const [mUsers, mUserCount] = await membershipUserRepo.findAndCount({
            relations: {
                user: true,
                membershipPackage: true
            }
        });
        if(mUserCount===0){
             res.status(404).json({
                message: 'No Membership User found'
            });
        }else{
             res.status(200).json({
                count: mUserCount,
                data: mUsers
            });
        }
    }

    static async createMembershipUser(req: Request, res: Response){

        const {startDate,endDate, uId, mId} = req.body;

        const membershipUser  = new MembershipUser();
        membershipUser.startDate = startDate;
        membershipUser.endDate = endDate;
        membershipUser.user = uId;
        membershipUser.membershipPackage = mId;

        const membershipUserRepo =  AppDataSource.getRepository(MembershipUser);
         await membershipUserRepo.save(membershipUser);

          res.status(200).json({
            message: "Membership User saved successfully",
             membership: membershipUser
         });

    }

    static async getMembershipUserById(req: Request, res: Response){
        const { id } = req.params;
        const membershipUserRepo = AppDataSource.getRepository(MembershipUser);
        const mUser =  await membershipUserRepo.findOne({
            where: { id },
            relations:{
                user:true,
                membershipPackage: true
            }
        });
        if(!mUser){
             res.status(404).json({
                message: `Membership User not found against your Id :${id}`,
            });
        }else{
             res.status(200).json({
                membership : mUser
            });
        }
    }

    static async updateMembershipUser(req: Request, res: Response){
        const { id } = req.params;
        const {startDate,endDate, isActive, uId, mId} = req.body;
        const membershipUserRepo = AppDataSource.getRepository(MembershipUser);
        const mUser = await membershipUserRepo.findOne({
            where: { id },
        });
        if(!mUser){
            res.status(404).json({
               message: `Membership User not found against your Id :${id}`,
           });
        }
        else{   
        mUser.isActive = isActive;
        mUser.startDate = startDate;
        mUser.endDate = endDate;
        mUser.user = uId;
        mUser.membershipPackage = mId;

        await membershipUserRepo.save(mUser);

         res.status(200).json({
            message:  `Membership User updated successfully`,
            membershipUser: mUser
        });
    }
    

    }

    static async deleteMenbershipUser(req: Request, res: Response){
        const { id } = req.params;
        const membershipUserRepo =  AppDataSource.getRepository(MembershipUser);
        const mUser = await membershipUserRepo.findOne({
            where: { id,}
        });
        if(!mUser){
             res.status(404).json({
                message: `Membership User not found against your Id :${id}`,
            });
        }else{
            await membershipUserRepo.remove(mUser);
             res.status(200).json({
                message: "Membership User removed successfully",
                membership_user: mUser
            });
        }
    }
}