import { Request, Response } from "express";
import { Book } from "../entity/Book.entity";
import { AppDataSource } from "../data-source";

export class BookController{



    static async searchBooks(req: Request, res: Response) {
        const { query, limit, offset } = req.query;
          let limitNumber = parseInt(limit.toString(), 10);
          let offsetNumber = parseInt(offset.toString(), 10);
       
        const bookRepository = AppDataSource.getRepository(Book);
        const books = await bookRepository.createQueryBuilder("book")
        .where("LOWER(book.title) LIKE LOWER(:query) OR LOWER(book.author) LIKE LOWER(:query) OR LOWER(book.isbn) LIKE LOWER(:query)", { query: `%${query}%` })
        .take(limitNumber)
        .skip(offsetNumber)
        .getMany();
        res.status(200).json({ books });
    }
    
    static async addBook(req:Request, res:Response){
        const { title, author, isbn, description } = req.body;
        const book = new Book();
        book.title = title;
        book.author = author;
        book.isbn = isbn;
        book.description = description;

        const bookRepository = AppDataSource.getRepository(Book);
        await bookRepository.save(book);
        res.status(200).json({message:"Book added succesffuly", book});
    }

    static async updateBook(req:Request, res:Response){
        const { id } = req.params;
        const { title, author, isbn, description,isRead } = req.body;
        const bookRepository = AppDataSource.getRepository(Book);
        const book = await bookRepository.findOne({
            where:{id},
        });
        if(book){
            book.title = title || book.title;
            book.author = author || book.author;
            book.isbn = isbn || book.isbn;
            book.description = description || book.description;
            book.isRead = isRead || book.isRead;
            await bookRepository.save(book);
            res.status(200).json({message:"Book updated", book});
        } else {
            res.status(404).json({message:"Book not found"});
        }
    }

    static async deleteBook(req:Request, res:Response){
        const { id } = req.params;
        const bookRepository = AppDataSource.getRepository(Book);
        const book = await bookRepository.findOne({
            where:{id},
        });
        if(book){
            await bookRepository.remove(book);
            res.status(200).json({message:"Book deleted", book});
        }else{
            res.status(404).json({message:"Book not found"});
        }
    }

    static async getBooks(req:Request, res:Response){
        const bookRepository = AppDataSource.getRepository(Book);
        const [books,bookCount] = await bookRepository.findAndCount();
        res.status(200).json({
            "Total Books":bookCount,
            "books":books
        });
    }

    static async getBook(req:Request, res:Response){
        const { id } = req.params;
        const bookRepository = AppDataSource.getRepository(Book);
        const book = await bookRepository.findOne({
            where:{id},
        });
        if(book){
        res.status(200).json({book});
        }else{
            res.status(404).json({message:"Book not found"});
        }
    }

    
}