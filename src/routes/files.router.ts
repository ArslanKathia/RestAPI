import * as express from "express";
import { FilesController } from "../controlllers/files.controller";
import * as multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/'); // specify the directory where you want to store the file
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // use the original file name
    }
  });
const upload = multer({ storage });
const router = express.Router();

router.post('/csv', upload.single('file'),
    FilesController.csvFileParser
);


export { router as FileRouter };