import * as express from "express";
import { ScrapeController } from "../controlllers/scrape.controller";

const router = express.Router();

router.get('/news',ScrapeController.getNewsData);
router.get('/newscomau',ScrapeController.getNewsCOMAUData);

export { router as ScrapeRouter }