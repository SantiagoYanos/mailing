import { Router } from "express";
import isLoggedIn from "../utils/isLoggedIn.js";

const router = Router();

router.get("/", isLoggedIn, (req, res) => {
  console.log(req.user);

  res.render("chat", { encryptedUsername: req.user.data.encryptedUsername });
});

export default router;
