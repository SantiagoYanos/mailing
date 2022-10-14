import bcrypt from "bcrypt";

const generateHash = (password) => {
  const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

  return hash;
};

const validatePassword = function (original, encrypted) {
  return bcrypt.compareSync(original, encrypted);
};

export default {
  generateHash,
  validatePassword,
};
