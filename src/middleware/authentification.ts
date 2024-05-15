import { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { AppStrings } from "../helpers/app-string";

dotenv.config();

export const authentification = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const header = req.headers.authorization;
    if(!header){
        return res.status(401).json({ message: AppStrings.UNAUTHORIZED_MSG});
    }
    const token = header.split(" ")[1];
    if(!token){
        return res.status(401).json({ message: AppStrings.UNAUTHORIZED_MSG});
    }

    const decode = jwt.verify(token,process.env.JWT_SECRET);
    if(!decode){
        return res.status(401).json({ message: AppStrings.UNAUTHORIZED_MSG});
    }
    req["currentUser"] = decode;
    next();
};