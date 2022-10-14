import bcrypt from "../utils/encryptPassword.js";
import userDB from "../database/usersDB.js";

function Register(user) {
  if (!user.username || !user.password) {
    return null;
  }

  if (userDB.getOneUser(user.username)) {
    return null;
  } else {
    user.createdAt = Date.now();

    user.password = bcrypt.generateHash(String(user.password));

    userDB.addUser(user);

    return user;
  }
}

function Login(user) {
  if (!user.username || !user.password) {
    return null;
  } else {
    const userFind = userDB.getOneUser(user.username);

    if (!userFind) {
      return null;
    }

    const decrypted = bcrypt.validatePassword(
      String(user.password),
      userFind.password
    );

    if (decrypted) {
      return userFind;
    } else {
      return null;
    }
  }
}

export default {
  Login,
  Register,
};
