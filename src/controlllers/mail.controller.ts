import { Request, Response } from 'express';
import { TransportMailer } from '../helpers/transport';
import * as dotenv from 'dotenv';
import EmailService from '../helpers/email.service';
//import * as multer from 'multer';
//const upload = multer({ dest: './uploads/mail/' }); // configure multer to store files in./uploads/


dotenv.config();

const emailService = new EmailService();
interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  attachments?: any[];
}

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

    static async sentMailAttachment(req:Request,res:Response){
      const { to, subject, text, html, attachment } = req.body;
      console.log(JSON.stringify(req.body));
      
      const emailOptions: EmailOptions = {
        from: process.env.EMAIL_USER || 'heyarslanmaqbool@gmail.com',  // sender address
        to,
        subject,
        text,
        html
      };
      if (attachment) {
        emailOptions.attachments = [attachment];
      }
      //  if (req.file) {
      //    emailOptions.attachments = [req.file];
      //  }

      try {
        await emailService.sendEmail(emailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
      }

    }



}