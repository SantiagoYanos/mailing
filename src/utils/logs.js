import fs from "fs";

export function logMessage(message, room) {
  if (fs.existsSync("./src/logs/log.txt")) {
    fs.appendFileSync(
      "./src/logs/log.txt",
      `${message.username}: \n     ${message.text}\n- ${message.time} | ${room}\n\n`
    );
  } else {
    if (!fs.existsSync("./src/logs")) {
      fs.mkdirSync("./src/logs/");
    }

    fs.writeFileSync(
      "./src/logs/log.txt",
      `${message.username}: \n     ${message.text}\n- ${message.time} | ${room}\n\n`
    );
  }
}

// export function logMail(mail) {
//   if (fs.existsSync("./src/logs/mails.txt")) {
//     fs.appendFileSync(
//       "./src/logs/mails.txt",
//       `from: ${mail.from}\n
//        to: ${mail.to}\n
//        subject: ${mail.subject}\n
//        text: ${mail.text}\n
//       \n`
//     );
//   } else {
//     fs.mkdirSync("./src/logs/");
//     fs.writeFileSync(
//       "./src/logs/mails.txt",
//       `from: ${mail.from}\n
//        to: ${mail.to}\n
//        subject: ${mail.subject}\n
//        text: ${mail.text}\n
//       \n`
//     );
//   }
// }

//asdasd

export function logMail(mail) {
  if (fs.existsSync("./src/logs/mails.txt")) {
    fs.appendFileSync("./src/logs/mails.txt", mail + "\n\n");
  } else {
    if (!fs.existsSync("./src/logs")) {
      fs.mkdirSync("./src/logs/");
    }
    fs.writeFileSync("./src/logs/mails.txt", mail + "\n\n");
  }
}
