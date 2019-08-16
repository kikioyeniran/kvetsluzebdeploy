const SendEmail = options => {

    let transport  = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "54d01d357bfd3f",
        pass: "a7938949f5d2df"
      }
    });

    const mailOptions = {
        from: 'helpdesk@gmail.com',
        to: options.email,
        subject: options.subject,
        html: options.message
    }

    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);

        }
    })
}

module.exports = SendEmail;

