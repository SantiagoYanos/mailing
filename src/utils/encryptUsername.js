import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();

const cryptrInstance = new Cryptr(process.env.SECRET_KEY_USERNAME);

export function encryptWord(word) {
  const encryptedString = cryptrInstance.encrypt(word);
  return encryptedString;
}

export function decryptWord(word) {
  const decryptedString = cryptrInstance.decrypt(word);
  return decryptedString;
}
