import * as nodemailer from 'nodemailer';

export class EmailSender {
  sendEmail(toEmail: string) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.CLIENT_EMAIL,
        pass: process.env.CLIENT_PASSWORD,
      },
    });

    const mailConfig = {
      from: process.env.CLIENT_EMAIL,
      to: toEmail,
      subject: 'This is the subject',
      html: this.getHtmlBody(),
      attachments: '',
    };
    transporter.sendMail(mailConfig, (error, info) => {
      if (error) {
        console.error('Error sending email: ', error);
      } else {
        console.log('Email sent: ', info.response);
      }
    });
  }

  getHtmlBody() {
    return `<h1>This is the message</h1>`;
  }
}
