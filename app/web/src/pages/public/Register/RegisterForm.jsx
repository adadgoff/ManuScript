import React from "react";
import { Alert, Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/UI/Loader/Loader";
import { LOADING_TEXT } from "../../../components/UI/Loader/LoaderConstants";
import { EMAIL_REGEX } from "../../../constants/Auth/AuthConstants";

const RegisterForm = ({ ...props }) => {
  const navigate = useNavigate();

  return (
    <Container className="my-3">
      { props.isLoading && <Loader title={ LOADING_TEXT }/> }

      { props.error && <Alert variant="danger">{ props.error }</Alert> }

      <div
        className="text-bg-info text-center text-white rounded p-3 mb-3 fs-4 fw-medium">
        Регистрация
      </div>

      <Form noValidate validated={ props.validated } onSubmit={ props.handleSubmit }>
        <FloatingLabel controlId="floatingInput" label="Электронная почта" className="mb-3">
          <Form.Control
            required
            type="email"
            pattern={ EMAIL_REGEX.source }
            placeholder="user@example.com"
            onChange={ (event) => props.setEmail(event.target.value) }
            disabled={ props.isLoading }
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingUsername" label="Имя пользователя" className="mb-3">
          <Form.Control
            required
            type="text"
            placeholder="username"
            onChange={ (event) => props.setUsername(event.target.value) }
            disabled={ props.isLoading }
          />
          <Form.Control.Feedback>Верный формат</Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" label="Пароль" className="mb-3">
          <Form.Control
            required
            type="password"
            placeholder="password"
            minLength={ 5 }
            onChange={ (event) => props.setPassword(event.target.value) }
            disabled={ props.isLoading }
          />
        </FloatingLabel>
        <Button
          type="submit"
          className="w-100"
          disabled={ props.isLoading }
        >Создать аккаунт</Button>
      </Form>

      <hr className="my-4"/>

      <Button
        type="submit"
        className="btn-success w-100"
        disabled={ props.isLoading }
        onClick={ () => navigate("/login") }
      >Уже есть аккаунт? Войти в систему</Button>
    </Container>
  );
};

export default RegisterForm;