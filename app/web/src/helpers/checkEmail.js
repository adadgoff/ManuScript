export const EMAIL_MAX_LENGTH = 320;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const checkEmail = (email) => {
  return email.length <= EMAIL_MAX_LENGTH && EMAIL_REGEX.test(email);
};