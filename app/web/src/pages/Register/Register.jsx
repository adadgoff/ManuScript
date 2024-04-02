import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../API/AuthService";
import { checkEmail } from "../../helpers/checkEmail";
import { checkPassword, PASSWORD_MIN_LENGTH } from "../../helpers/checkPassword";
import { checkUsername, USERNAME_MAX_LENGTH } from "../../helpers/checkUsername";
import RegisterForm from "./RegisterForm";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!checkEmail(email)) {
      event.stopPropagation();
      setError("Неверный формат электронной почты");
      return;
    } else if (!checkUsername(username)) {
      event.stopPropagation();
      setError(`Максимальная длина имени пользователя ${ USERNAME_MAX_LENGTH } символов`)
    } else if (!checkPassword(password)) {
      event.stopPropagation();
      setError(`Пароль должен состоять минимум из ${ PASSWORD_MIN_LENGTH } символов`);
      return;
    }

    setValidated(true);
    setIsLoading(true);

    try {
      const registerResponse = await AuthService.register(email, username, password);
      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();
        setError(errorData.detail);
        return;
      }
      const loginResponse = await AuthService.login(email, password);
      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        setError(errorData.detail);
        return;
      }
      navigate("/learn");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegisterForm
      isLoading={ isLoading }
      error={ error }
      validated={ validated }
      handleSubmit={ handleSubmit }
      setEmail={ setEmail }
      setUsername={ setUsername }
      setPassword={ setPassword }
    />
  );
};

export default Register;