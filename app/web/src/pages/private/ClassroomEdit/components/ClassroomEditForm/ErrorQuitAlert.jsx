import React from "react";
import { Alert } from "react-bootstrap";

const ErrorQuitAlert = ({ errorMessage, setErrorMessage, ...props }) => {
  return (
    <Alert
      variant="danger"
      onClose={ () => setErrorMessage("") }
      dismissible
      className="my-3"
      { ...props }
    >
      <Alert.Heading>Ошибка с выходом из класса!</Alert.Heading>
      <p className="mb-0">{ errorMessage }</p>
    </Alert>
  );
};

export default ErrorQuitAlert;