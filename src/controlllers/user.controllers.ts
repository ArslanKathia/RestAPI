import { UserResponse } from './../dto/user.dto';
import { Request, Response } from "express";
import { encrypt } from "../helpers/encrypt";
import { User } from "../entity/User.entity";
import { AppDataSource } from "../data-source";
import * as cache from "memory-cache";
import * as multer from 'multer';
const upload = multer({ dest: 'uploads/' });

export class UserController{
    static async signup(req:Request,res:Response){
        const { name, email, password, role }  = req.body;
        const encryptedPassword = await encrypt.encryptpass(password);
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = encryptedPassword;
        user.role = role;
        //user.profileImage = profileImage; // set the profileImage field


        const userRepository = AppDataSource.getRepository(User);
        await userRepository.save(user);
        //use the UserResponse DTO to structure the data being sent in the response
        const userdataSent = new UserResponse();
        userdataSent.name = user.name;
        userdataSent.email = user.email;
        userdataSent.role = user.role;
        userdataSent.profileImage = user.profileImage; // include the profileImage field

        
        const token = encrypt.generateToken({ id: user.id});

        return res
            .status(200)
            .json({ message:"User created succesffuly", token, userdataSent});
    }

    static async getUsers(req:Request, res:Response){
        const data = cache.get("data");
        if(data){
            console.log("Serving from cache");
            return res.status(200)
            .json({ data,});
        }else{
            console.log("serving from db");
            const userRepository = AppDataSource.getRepository(User);
            const users = await userRepository.find();

            cache.put("data",users,6000);
            return res.status(200).json({
                data: users
            });
        }
    }
    static async updateUser(req:Request, res:Response){
        const { id } = req.params;
        const { name,email,profileImage } = req.body;
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where:{id},
        });
        user.name = name;
        user.email = email;
        user.profileImage = profileImage;
        await userRepository.save(user);
        res.status(200).json({message:"updated",user});
    }
    static async deleteUser(req:Request, res:Response){
        const { id }= req.params;
        const userRespository = AppDataSource.getRepository(User);
        const user = await userRespository.findOne({
            where: {id},
        });
        await userRespository.remove(user);

        res.status(200).json({
            message : "ok deleted Successfully"
        });
    }

    static async uploadProfileImage(req:Request, res:Response){
        // upload.single('profileImage')(req, res, (err) => {
        //     if(err){
        //         return res.status(400).json({message: "Error uploading file"});
        //     }
        //     res.status(200).json({message: "File uploaded successfully", filename: req.file.filename});
        // });

        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'uploads/');
            },
            filename: (req, file, cb) => {
                const ext = file.mimetype.split('/')[1];
                const filename = `${Date.now()}.${ext}`;
                cb(null, filename);
            }
        });
    
        const upload = multer({ storage: storage });
    
        upload.single('profileImage')(req, res, (err) => {
            if(err){
                return res.status(400).json({message: "Error uploading file"});
            }
            const filename = req.file.filename;
            res.status(200).json({message: "File uploaded successfully", filename: filename});
        });
    }

}