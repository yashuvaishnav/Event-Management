const express = require("express");
const sendMail = require("./mail");
const mailRouter = express.Router();

mailRouter.post("/registrationMail", async (req, res) => {
  const { name, email, url } = req.body;
  const emailContent = `
     <!DOCTYPE html>
          <html>
          <head>
        <body>
          <div class="mainContainer">
            <h3>${name}</h3>
            <p>${email}</p>
            <a href=${url} target="_blank">${url}</a>
          </div>
        </body>
      </html>
              `;
  try {
    await sendMail(email, "Hello Sir", emailContent);
    res.status(200).send({ msg: "Email sent successfully" });
  } catch (error) {
    res.status(400).send({ error: "Failed to send email" });
  }
});

mailRouter.post("/thankYoumail", async (req, res) => {
  const { name, email, url } = req.body;
  const emailContent = `
     <!DOCTYPE html>
          <html>
          <head>
        <body>
          <div class="mainContainer">
            <h3>${name}</h3>
            <p>${email}</p>
            <a href=${url} target="_blank">${url}</a>
          </div>
        </body>
      </html>
              `;
  try {
    await sendMail(email, "Thank You", emailContent);
    res.status(200).send({ msg: "Email sent successfully" });
  } catch (error) {
    res.status(400).send({ error: "Failed to send email" });
  }
});

module.exports = { mailRouter };
