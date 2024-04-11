import { USERNAME_MAX_LENGTH } from "../constants/Auth/AuthConstants";

export const checkUsername = (username) => {
  return 1 <= username.length && username.length <= USERNAME_MAX_LENGTH;
}