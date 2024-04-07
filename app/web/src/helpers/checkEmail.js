import { EMAIL_MAX_LENGTH, EMAIL_REGEX } from "../constants/Auth/AuthConstants";

export const checkEmail = (email) => {
  return email.length <= EMAIL_MAX_LENGTH && EMAIL_REGEX.test(email);
};