import React, { useState } from "react";
import { Alert, Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import { checkEmail } from "../../helpers/checkEmail";
import { checkPassword, PASSWORD_MIN_LENGTH } from "../../helpers/checkPassword";
import { checkUsername, USERNAME_MAX_LENGTH } from "../../helpers/checkUsername";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
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
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail);
        return;
      }

      await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      });

      navigate("/learn", { replace: true });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="my-3">
      { isLoading && <Loader/> }

      { error && <Alert variant="danger">{ error }</Alert> }

      <div
        className="text-bg-info text-center text-white rounded p-3 mb-3 fs-4 fw-medium">
        Регистрация
      </div>

      <Form noValidate validated={ validated } onSubmit={ handleSubmit }>
        <FloatingLabel controlId="floatingInput" label="Электронная почта" className="mb-3">
          <Form.Control
            required
            type="email"
            placeholder="user@example.com"
            onChange={ (event) => setEmail(event.target.value) }
            disabled={ isLoading }
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingUsername" label="Имя пользователя" className="mb-3">
          <Form.Control
            required
            type="text"
            placeholder="username"
            onChange={ (event) => setUsername(event.target.value) }
            disabled={ isLoading }
          />
          <Form.Control.Feedback>Верный формат</Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" label="Пароль" className="mb-3">
          <Form.Control
            required
            type="password"
            placeholder="password"
            onChange={ (event) => setPassword(event.target.value) }
            disabled={ isLoading }
          />
        </FloatingLabel>
        <Button
          type="submit"
          className="w-100"
          disabled={ isLoading }
        >Создать аккаунт</Button>
      </Form>

      <hr className="my-4"/>

      <Button
        type="submit"
        className="btn-success w-100"
        disabled={ isLoading }
        onClick={() => navigate("/login")}
      >Уже есть аккаунт? Войти в систему</Button>
    </Container>
  );
};

export default Register;