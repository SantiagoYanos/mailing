import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { token } from "morgan";

dotenv.config();

function isLoggedIn(req, res, next) {
  let token = req.cookies.token;

  if (!token) {
    return res.redirect("/auth/login");
  }

  let user = jwt.verify(token, process.env.SECRET_KEY); //Verificamos el token

  if (user) {
    req.user = user;

    const newToken = jwt.sign({ data: user.data }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    }); //Se actualiza el token

    res.cookie("token", newToken, { expire: "1h" });

    return next();
  } else {
    res.clearCookie("token");

    return res.redirect("/auth/login");
  }
}

export default isLoggedIn;
