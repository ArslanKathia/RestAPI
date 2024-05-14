import * as express from "express";
import { authentification } from "../middleware/authentification";
import { authorization } from "../middleware/authorization";
import { UserController } from "../controlllers/user.controllers";
import { AuthController } from "../controlllers/auth.controller";



const Router = express.Router();


Router.get(
    "/users",
    authentification,
    authorization(["admin"]),
    UserController.getUsers
);

Router.get(
    "/profile",
    authentification,
    authorization(["admin","user"]),
    AuthController.getProfile
);

Router.post("/signup", UserController.signup);
Router.post("/login",AuthController.login);

Router.put(
    "/update/:id",
    authentification,
    authorization(["admin","user"]),
    UserController.updateUser
);

Router.delete(
    "/delete/:id",
    authentification,
    authorization(["admin"]),
    UserController.deleteUser
);

export { Router as userRouter};