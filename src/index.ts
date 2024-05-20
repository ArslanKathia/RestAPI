import { AppDataSource } from "./data-source";
import * as express from "express";
import * as dotenv from "dotenv";
import { Request,Response } from "express";
import { userRouter } from "./routes/user.routes";
import { movieRouter} from "./routes/movie.routes"
import "reflect-metadata";
import { errorHandler } from "./middleware/errorHandler";
import helmet from "helmet";
import { membershipPackageRouter } from "./routes/membershipPackage.routes";
import { MembershipFeatureRouter } from "./routes/membershipFeature.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(errorHandler);

const { PORT = 3000 } =  process.env;
app.use("/auth",userRouter);
app.use("/api", movieRouter);
app.use("/membership",membershipPackageRouter);
app.use("/package",MembershipFeatureRouter);


app.get("*",(req:Request, res:Response) => {
    res.status(505).json({
        message: "Bad Request - No Route Defined"
    })
});

AppDataSource.initialize()
.then(async () => {

    app.listen(PORT,()=>{
        console.log(`Server is running on https://localhost:"${PORT}`);
    });
    console.log("Data Source has been initalized");

}).catch(error => console.log(error))
