import { Router } from "express";
import { sendMail } from "../utils/mail.js";
import fs from "fs";
import { logMail } from "../utils/logs.js";

const router = Router();

const mailFile = "src/data/mail.json";

router
  .get("/", (req, res) => {
    const data = fs.readFileSync(mailFile, "utf-8");
    res.json(JSON.parse(data));
  })

  /*
    {
    "from": "Santiago@gmail.com",
    "to": "Roberto@gmail.com",
    "subject": "Titulo del email",
    "text": "Este es un mail",
    "html": "<b>jaja</b>"
    }

  */

  .post("/", async (req, res) => {
    const mail = req.body;
    const { from, to, subject, text, html } = mail;

    if (!from || !to || !subject || !text || !html) {
      return res.status(400).send("Faltan datos");
    }

    const sentMail = await sendMail({ from, to, subject, text, html });

    if (sentMail) {
      if (fs.existsSync(mailFile)) {
        const mails = JSON.parse(fs.readFileSync(mailFile, "utf-8"));
        mails.push(sentMail);
        fs.writeFileSync(mailFile, JSON.stringify(mails));
        logMail(JSON.stringify([sentMail]));
      } else {
        fs.writeFileSync(mailFile, JSON.stringify([sentMail]));
        logMail(JSON.stringify([sentMail]));
      }
    }

    res.status(201).send("Mail enviado exitosamente!");
  });

export default router;
