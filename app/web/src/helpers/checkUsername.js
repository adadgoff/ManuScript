import { USERNAME_MAX_LENGTH } from "../constants/Auth/AuthConstants";

export const checkUsername = (username) => {
  return username.length <= USERNAME_MAX_LENGTH;
}