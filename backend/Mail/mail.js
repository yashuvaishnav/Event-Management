const nodemailer = require("nodemailer");

async function sendMail(user_email, subject, html) {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yvaishnav90@gmail.com",
        pass: "vxul rajw kuxc xnec",
      },
    });

    const options = {
      from: "yvaishnav90@gmai.com",
      to: user_email,
      subject,
      html,
    };

    await transport.sendMail(options);
  } catch (error) {
    res.status(400).send({msg : "Failed to send email"})
  }
}

module.exports = sendMail;