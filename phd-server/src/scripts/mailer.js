import nodemailer from 'nodemailer';



function send_mail(user_email, mail_content){

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ashi.parashar173@gmail.com',
          pass: '@$hi1794'
        }
      });
      
    var mailOptions = {
        from: 'ashi.parashar173@gmail.com',
        to: user_email,
        subject: 'Sending Seizure Report',
        text: `There is ${mail_content} in your Tests`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log("Error while sending the mail",error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}


module.exports = send_mail;
