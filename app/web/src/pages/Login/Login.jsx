import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../API/AuthService";
import { checkEmail } from "../../helpers/checkEmail";
import { checkPassword, PASSWORD_MIN_LENGTH } from "../../helpers/checkPassword";
import LoginForm from "./LoginForm";

const Register = () => {
  const [email, setEmail] = useState("");
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
    } else if (!checkPassword(password)) {
      event.stopPropagation();
      setError(`Пароль должен состоять минимум из ${ PASSWORD_MIN_LENGTH } символов`);
      return;
    }

    setValidated(true);
    setIsLoading(true);

    try {
      const response = await AuthService.login(email, password);
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail);
        return;
      }
      navigate("/learn", { replace: true });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginForm
      isLoading={ isLoading }
      error={ error }
      validated={ validated }
      handleSubmit={ handleSubmit }
      setEmail={ setEmail }
      setPassword={ setPassword }
    />
  );
};

export default Register;