import { Router } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { encryptWord } from "../utils/encryptUsername.js";

import auth from "../auth/auth.js";

const router = Router();
dotenv.config();

router
  .get("/login", (req, res) => {
    res.render("login");
  })

  .post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ status: "ERROR", message: "Complete all the fields!" });
    }

    const userLogin = {
      username,
      password,
    };

    const loginUser = auth.Login(userLogin);

    if (!loginUser) {
      return res.status(400).json({
        status: "ERROR",
        message: "No user found with that username/password",
      });
    }

    //----------------------------------------- Crea Cookie
    const newToken = jwt.sign(
      {
        data: {
          username: loginUser.username,
          encryptedUsername: encryptWord(loginUser.username),
        },
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", newToken, { expire: "1h" });

    //-----------------------------------------

    return res.status(200).redirect("/chat/");
  })

  .get("/register", (req, res) => {
    res.render("sign-up");
  })

  .post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ status: "ERROR", message: "Complete all the fields!" });
    }

    const newUser = {
      username,
      password,
    };

    const registerResult = auth.Register(newUser);

    if (!registerResult) {
      return res
        .status(400)
        .json({ status: "ERROR", message: "Username already in use!" });
    }

    //-------------------------------------------- Crea Cookie

    const newToken = jwt.sign(
      { data: { email: registerResult.email } },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", newToken, { expire: "1h" });

    //--------------------------------------------

    return res.status(201).json({
      status: "OK",
      message: "Username created successfully!",
      data: registerResult,
    });
  });

export default router;
