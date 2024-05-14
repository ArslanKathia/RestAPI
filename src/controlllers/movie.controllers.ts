import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Movies } from "../entity/Movies.entity";
export class MovieContoller{
    static async getAllMovies(req:Request,res:Response){
        const data =  cache.get("data");
        if(data){
            console.log("serving from cache");
            res.status(200).json({
                data,
            });
        }else{
            console.log("serving from db");
            const movieRepo = AppDataSource.getRepository(Movies);
            const movies = movieRepo.find();
            cache.put("data",movies,6000);
            return res.status(200).json({
                data: movies,
            });
        }
    }

    static async createMovie(req:Request, res: Response){
        const { title,description,director,year,rating,image,cast} = req.body;
        const movie = new Movies();
        movie.title = title;
        movie.description = description;
        movie.director = director;
        movie.year = year;
        movie.rating = rating;
        movie.image = image;
        movie.cast = cast;
        
        const movieRepo  =  AppDataSource.getRepository(Movies);
        await movieRepo.save(movie);
        return res.status(200)
        .json({
            message: "Movie created successfully",movie: movie
        });
    }

    static async getMovieById(req:Request, res:Response){
        const { id }  = req.params;
        const movieRepo = AppDataSource.getRepository(Movies);
        const movie = await movieRepo.findOne({
            where: {id}
        });
        res.status(200).json({
            data: movie
        })
    }

    static async updateMovie(req:Request,res:Response){
        const { id } = req.params;
        const { title,description,director,year,rating,image,cast} = req.body;
        const movieRepo = AppDataSource.getRepository(Movies);
        const movie = await movieRepo.findOne({
            where: {id},
        });
        movie.title = title;
        movie.description = description;
        movie.director = director;
        movie.year = year;
        movie.rating = rating;
        movie.image = image;
        movie.cast = cast;
        await movieRepo.save(movie);

        res.status(200).json({
            message: "Movies Updated Successfully", movie
        });
    }

    static async deleteMovie(req: Request, res: Response){
        const { id } = req.params;
        const movieRepo = AppDataSource.getRepository(Movies);
        const movie = await movieRepo.findOne({
            where: { id }
        });
        await movieRepo.remove(movie);
        return res.status(200)
        .json({
            message: "Movie deleted successfully",movie: movie
        });
    }
}