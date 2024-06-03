import { TransportMailer } from './transport';

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  attachments?: any[];
}

class EmailService {

  async sendEmail(options: EmailOptions) {
    const mailOptions = {
      from: options.from,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments
    };

    if (options.attachments) {
      mailOptions.attachments = options.attachments.map((attachment) => {
        return {
          filename: attachment.originalname,
          path: attachment.path
        };
      });
    }

    try {
      await TransportMailer.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

export default EmailService;