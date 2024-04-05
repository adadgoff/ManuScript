import { EMAIL_MAX_LENGTH, EMAIL_REGEX } from "../constants/auth";

export const checkEmail = (email) => {
  return email.length <= EMAIL_MAX_LENGTH && EMAIL_REGEX.test(email);
};