import * as express from "express";
import { authentification } from "../middleware/authentification";
import { MailController } from "../controlllers/mail.controller";

const router = express.Router();


router.post('/sent',
    //authentification,
    MailController.sendMail
);

export { router as MailRouter};