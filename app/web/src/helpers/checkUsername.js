export const USERNAME_MAX_LENGTH = 50;

export const checkUsername = (username) => {
  return username.length <= USERNAME_MAX_LENGTH;
}