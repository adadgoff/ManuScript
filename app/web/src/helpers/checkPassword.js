import { PASSWORD_MIN_LENGTH } from "../constants/Auth/AuthConstants";

export const checkPassword = (password) => {
  return PASSWORD_MIN_LENGTH <= password.length;
}