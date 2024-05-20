import { MembershipFeatures } from './../entity/MembershipFeatures';
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Tree } from 'typeorm';

export class MembershipFeaturesController{
    static async getMembershipFeatures( req: Request, res: Response){
        const featureRepo = AppDataSource.getRepository(MembershipFeatures);
        const [features, featureCount] = await featureRepo.findAndCount({
            relations: {
                membershipPackage: true
            }
        });
        if(featureCount===0){
             res.status(404).json({
                message: 'Package Features not found'
            });
        }else{
             res.status(200).json({
                count: featureCount,
                data: features
            });
        }
    }

    static async createMembershipFeatures(req: Request, res: Response){

        const { name, description, mId} = req.body;

        const membershipFeature  = new MembershipFeatures();
        membershipFeature.name = name;
        membershipFeature.description = description;
        membershipFeature.membershipPackage = mId;

        const featureRepo =  AppDataSource.getRepository(MembershipFeatures);
         await featureRepo.save(membershipFeature);

          res.status(200).json({
            message: "Memebership Feature saved successfully",
             package: membershipFeature
         });

    }

    static async getMembershipFeatureById(req: Request, res: Response){
        const { id } = req.params;
        const featureRepo = AppDataSource.getRepository(MembershipFeatures);
        const mFeature =  await featureRepo.findOne({
            where: { id },
            relations:{
                membershipPackage: true
            }
        });
        if(!mFeature){
             res.status(404).json({
                message: `Package Feature not found against your Id :${id}`,
            });
        }else{
             res.status(200).json({
                package : mFeature
            });
        }
    }

    static async updateMemebershipFeature(req: Request, res: Response){
        const { id } = req.params;
        const { name, description, mId} = req.body;
        const featureRepo = AppDataSource.getRepository(MembershipFeatures);
        const mFeature = await featureRepo.findOne({
            where: { id },
        });
        if(!mFeature){
            res.status(404).json({
               message: `Package Feature not found against your Id :${id}`,
           });
        }
        else{   
        mFeature.name = name;
        mFeature.description = description;
        mFeature.membershipPackage = mId;

        await featureRepo.save(mFeature);

         res.status(200).json({
            message:  `Membership package Feature uodated successfully`,
            mFeature
        });
    }
    

    }

    static async deleteMembershipFeature(req: Request, res: Response){
        const { id } = req.params;
        const featureRepo =  AppDataSource.getRepository(MembershipFeatures);
        const mFeature = await featureRepo.findOne({
            where: { id,}
        });
        if(!mFeature){
             res.status(404).json({
                message: `Package feature not found against your Id :${id}`,
            });
        }else{
            await featureRepo.remove(mFeature);
             res.status(200).json({
                message: "Membership pacakge Feature removed successfully",
                package: mFeature
            });
        }
    }
}