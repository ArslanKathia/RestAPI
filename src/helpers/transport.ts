import * as nodemailer from 'nodemailer'; // create reusable transporter object using the default SMTP transport
import * as dotenv from 'dotenv';

dotenv.config();
//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,  /// 587 for non-secure
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false,
    }
  });

  export { transporter as TransportMailer };