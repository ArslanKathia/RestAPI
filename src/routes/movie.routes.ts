import * as express from "express";
import { authentification } from "../middleware/authentification";
import { MovieContoller } from "../controlllers/movie.controllers";
import { authorization } from "../middleware/authorization";


const Router = express.Router();

Router.get("/movies",authentification,MovieContoller.getAllMovies);
Router.post("/movies",authentification,MovieContoller.createMovie);


Router.get(
    "/movies/:id",
    authentification,
    MovieContoller.getMovieById 
);
 
Router.put(
    "/movies/:id",
    authentification,
    authorization(["admin"]),
    MovieContoller.updateMovie
);

Router.delete(
    "/movies/:id",
    authentification,
    authorization(["admin"]),
    MovieContoller.deleteMovie
);


export { Router as movieRouter};