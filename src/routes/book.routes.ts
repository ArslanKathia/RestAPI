import * as express from "express";
import { BookController } from "../controlllers/book.controller";

const router = express.Router();

router.get('/search',BookController.searchBooks);
router.post('/add', BookController.addBook);
router.put('/update/:id', BookController.updateBook);
router.delete('/delete/:id', BookController.deleteBook);
router.get('/get', BookController.getBooks);
router.get('/get/:id', BookController.getBook);



export { router as BookRouter}