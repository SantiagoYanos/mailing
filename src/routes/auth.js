import { Router } from "express";

import auth from "../auth/auth.js";

const router = Router();

router
  .get("/login", (req, res) => {
    res.send("Login");
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

    return res.status(200).json({
      status: "OK",
      message: "User logged succesfully!",
      data: loginUser,
    });
  })

  .get("/register", (req, res) => {
    res.send("Register");
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

    return res.status(201).json({
      status: "OK",
      message: "Username created successfully!",
      data: registerResult,
    });
  });

export default router;
