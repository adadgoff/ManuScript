import { PASSWORD_MIN_LENGTH, USERNAME_MAX_LENGTH } from "../Auth/AuthConstants";

// ERRORS: LOGIN / REGISTER.
export const EMAIL_ERROR = "Неверный формат электронной почты.";
export const PASSWORD_ERROR = `Пароль должен состоять минимум из ${ PASSWORD_MIN_LENGTH } символов.`;
export const USERNAME_ERROR = `Длина имени пользователя от 1 до ${ USERNAME_MAX_LENGTH } символов.`;

// ERRORS: IMAGE.
export const IMAGE_SIZE_ERROR = "Пожалуйста, выберите файл с размером до 5 MB.";
export const IMAGE_EXTENSION_ERROR = "Пожалуйста, выберите файл с расширением картинки (png, jpg)."