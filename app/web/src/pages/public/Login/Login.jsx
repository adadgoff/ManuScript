import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../API/Auth/AuthService";
import { EMAIL_ERROR, PASSWORD_ERROR } from "../../../constants/Error/ErrorConstants";
import { checkEmail } from "../../../helpers/checkEmail";
import { checkPassword } from "../../../helpers/checkPassword";
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
      setError(EMAIL_ERROR);
      return;
    } else if (!checkPassword(password)) {
      event.stopPropagation();
      setError(PASSWORD_ERROR);
      return;
    }

    setValidated(true);
    setIsLoading(true);

    try {
      const response = await AuthService.login(email, password);
      if (response.detail) {
        setError(response.detail);
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