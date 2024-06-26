import "reflect-metadata";
import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
import { User } from "./entity/User.entity";
import { Movies } from "./entity/Movies.entity";
import { MembershipUser } from "./entity/MembershipUser";
import { MembershipFeatures } from "./entity/MembershipFeatures";
import { MembershipPackage } from "./entity/MembershipPackage";
import { Book } from "./entity/Book.entity";

dotenv.config();
const { DB_HOST,DB_PORT,DB_USERNME,DB_PASSWORD, DB_DATABASE,NODE_ENV} = process.env

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: parseInt(DB_PORT || "5432"),
    username: DB_USERNME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize:  NODE_ENV === "dev" ? true:false,
    logging: NODE_ENV === "dev" ? true:false,
    entities: [User,Movies,MembershipUser,MembershipFeatures,MembershipPackage,Book],
    migrations: [__dirname+"/src/migration/*.ts"],
    subscribers: [],
})
