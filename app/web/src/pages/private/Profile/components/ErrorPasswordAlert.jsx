import React from "react";
import { Alert } from "react-bootstrap";

const ErrorPasswordAlert = ({ errorPasswordMessage, setErrorPasswordMessage }) => {
  return (
    <Alert
      variant="danger"
      onClose={ () => setErrorPasswordMessage("") }
      dismissible
      className="my-3 pb-0"
    >
      <Alert.Heading>Ошибка с паролем!</Alert.Heading>
      <p>{ errorPasswordMessage }</p>
    </Alert>
  );
};

export default ErrorPasswordAlert;