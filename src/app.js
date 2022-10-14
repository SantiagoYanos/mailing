import express, { application } from "express";
import morgan from "morgan";
import path from "path";
import * as url from "url";
import mailRoute from "./routes/mail.js";
import authRoute from "./routes/auth.js";
import chatRoute from "./routes/chat.js";
import cookieParser from "cookie-parser";

import { engine } from "express-handlebars";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const app = express();

app.use(express.static(path.join(__dirname + "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/mail", mailRoute);
app.use("/auth", authRoute);
app.use("/chat/", chatRoute);
app.use("/home", (req, res) => {
  res.render("index");
});

app.use("*", (req, res) => {
  res.redirect("/home");
});

export default app;
