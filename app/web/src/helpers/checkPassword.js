export const PASSWORD_MIN_LENGTH = 5;

export const checkPassword = (password) => {
  return PASSWORD_MIN_LENGTH <= password.length;
}