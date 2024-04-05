import { PASSWORD_MIN_LENGTH } from "../constants/auth";

export const checkPassword = (password) => {
  return PASSWORD_MIN_LENGTH <= password.length;
}