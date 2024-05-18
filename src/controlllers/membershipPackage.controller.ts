import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { MembershipPackage } from "../entity/MembershipPackage";

export class MembershipPackageController{
    static async getMembershipPackages( req: Request, res: Response){
        const packagesRepo = AppDataSource.getRepository(MembershipPackage);
        const [packages, packagesCount] = await packagesRepo.findAndCount();
        if(packagesCount===0){
             res.status(404).json({
                message: 'Package not found'
            });
        }else{
             res.status(200).json({
                count: packagesCount,
                data: packages
            });
        }


    }

    static async createMembershipPackage(req: Request, res: Response){

        const { name, description, price, duration} = req.body;

        const membershipPackage  = new MembershipPackage();
        membershipPackage.name = name;
        membershipPackage.description = description;
        membershipPackage.price = price;
        membershipPackage.durations= duration;

        const packageRepo =  AppDataSource.getRepository(MembershipPackage);
         await packageRepo.save(membershipPackage);

          res.status(200).json({
            message: "Memebership Package saved successfully",
             package: membershipPackage
         });

    }

    static async getMembershipPackageById(req: Request, res: Response){
        const { id } = req.params;
        const packageRepo = AppDataSource.getRepository(MembershipPackage);
        const mPackage =  await packageRepo.findOne({
            where: { id }
        });
        if(!mPackage){
             res.status(404).json({
                message: `Package not found against your Id :${id}`,
            });
        }else{
             res.status(200).json({
                package : mPackage
            });
        }
    }

    static async updateMemebershipPackage(req: Request, res: Response){
        const { id } = req.params;
        const { name, description, price, duration , isActive} = req.body;
        const packageRepo = AppDataSource.getRepository(MembershipPackage);
        const mPackage = await packageRepo.findOne({
            where: { id },
        });
        mPackage.name = name;
        mPackage.description = description;
        mPackage.price = price;
        mPackage.durations = duration;
        mPackage.isActive = isActive;

        await packageRepo.save(mPackage);

         res.status(200).json({
            message: 'Package uodated successfully',
            mPackage
        });
    

    }

    static async deleteMembershipPackage(req: Request, res: Response){
        const { id } = req.params;
        const packageRepo =  AppDataSource.getRepository(MembershipPackage);
        const mPackage = await packageRepo.findOne({
            where: { id,}
        });
        if(!mPackage){
             res.status(404).json({
                message: `Package not found against your Id :${id}`,
            });
        }else{
            await packageRepo.remove(mPackage);
             res.status(200).json({
                message: "Package removed successfully",
                package: mPackage
            });
        }
    }
}