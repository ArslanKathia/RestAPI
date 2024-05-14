import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { encrypt } from "../helpers/encrypt";

export class AuthController{

    static async login(req: Request, res: Response){
        try{
            const { email, password } = req.body;
            if(!email || !password){
                return res.status(500).json({ message:"email and password required"});
            }
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where:{email}});
            const isPasswordValid = encrypt.comparepassword(user.password,password);
            if(!user || !isPasswordValid){
                return res.status(404)
                .json({ message: "user not found" });
            }
            const token = encrypt.generateToken({id: user.id});
            return res.status(200).json({ message: "Login Successfully", user, token });
        }catch(err){
            console.log(err);
            return res.status(500).json({message: "Internal Server Error"});
        }
    }

    static async getProfile(req: Request, res: Response){
        console.log(`currentuser:${JSON.stringify(req["currentUser"])}`);
       // if(!req[" currentUser"]){
       //     return res.status(401).json({message: "Unauthorized"});
       // }
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: { id: req["currentUser"].id},
        });
        return res.status(200)
        .json({...user,password:undefined});
    }
}