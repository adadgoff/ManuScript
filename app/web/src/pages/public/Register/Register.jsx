import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../API/Auth/AuthService";
import { EMAIL_ERROR, PASSWORD_ERROR, USERNAME_ERROR } from "../../../constants/Error/ErrorConstants";
import { AuthContext } from "../../../context/Auth/AuthContext";
import { checkEmail } from "../../../helpers/checkEmail";
import { checkPassword } from "../../../helpers/checkPassword";
import { checkUsername } from "../../../helpers/checkUsername";
import RegisterForm from "./RegisterForm";

const Register = () => {
  const { setToken } = useContext(AuthContext);

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
      setError(EMAIL_ERROR);
      return;
    } else if (!checkUsername(username)) {
      event.stopPropagation();
      setError(USERNAME_ERROR)
      return;
    } else if (!checkPassword(password)) {
      event.stopPropagation();
      setError(PASSWORD_ERROR);
      return;
    }

    setValidated(true);
    setIsLoading(true);

    try {
      const registerResponse = await AuthService.register(email, username, password);
      if (registerResponse.detail) {
        setError(registerResponse.detail);
        return;
      }
      const loginResponse = await AuthService.login(email, password);
      if (loginResponse.detail) {
        setError(loginResponse.detail);
        return;
      }

      setToken(loginResponse.access_token);
      localStorage.setItem("access_token", loginResponse.access_token);
      navigate("/learn", { replace: true });
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