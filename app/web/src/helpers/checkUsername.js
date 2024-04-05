import { USERNAME_MAX_LENGTH } from "../constants/auth";

export const checkUsername = (username) => {
  return username.length <= USERNAME_MAX_LENGTH;
}