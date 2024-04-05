import { PASSWORD_MIN_LENGTH, USERNAME_MAX_LENGTH } from "./auth";

// ERRORS: LOGIN / REGISTER.
export const EMAIL_ERROR = "Неверный формат электронной почты";
export const USERNAME_ERROR = `Максимальная длина имени пользователя ${ USERNAME_MAX_LENGTH } символов`;
export const PASSWORD_ERROR = `Пароль должен состоять минимум из ${ PASSWORD_MIN_LENGTH } символов`;

// ERRORS: LEARN / TEACH.
export const FETCHING_CLASSROOMS_ERROR = "Error fetching classrooms:";

