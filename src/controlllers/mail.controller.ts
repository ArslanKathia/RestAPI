import { Request, Response } from 'express';
import { TransportMailer } from '../helpers/transport';
import * as dotenv from 'dotenv';
//import * as multer from 'multer';
//const upload = multer({ dest: './uploads/mail/' }); // configure multer to store files in./uploads/

dotenv.config();

export class MailController{

    static async sendMail(req:Request,res:Response){
        const { to, subject, text, body} = req.body;
       // console.log(`Body:to=${to} - ${subject} - ${text} - ${body}`);
        // send mail with defined transport object
        const mailOptions = {
            from: process.env.EMAIL_USER || 'heyarslanmaqbool@gmail.com',  // sender address
            to: to,   // list of receivers
            subject: subject, 
            text: text, 
            html: body
        };
                // Check if attachments exist in the request
        // if (req.files && req.files.length > 0) {
        //     mailOptions.attachments = req.files.map((file) => {
        //     return {
        //         filename: file.originalname,
        //         path: file.path
        //     };
        //     });
        // }

        TransportMailer.sendMail(mailOptions, function(err: any, info: { response: string; }) {
            if (err) {
              console.log(err);
              res.status(500).json({
                message: err
              })
            } else {
              console.log('Email sent: ' + info.response);
              res.status(200).json({
                message: `Email sent: ' ${info.response}`,
              })
            }
          });

    }



}