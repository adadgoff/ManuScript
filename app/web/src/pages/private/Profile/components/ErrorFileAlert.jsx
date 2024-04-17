import React from "react";
import { Alert } from "react-bootstrap";

const ErrorFileAlert = ({ errorFileMessage, setErrorFileMessage }) => {
  return (
    <Alert
      variant="danger"
      onClose={ () => setErrorFileMessage("") }
      dismissible
      className="my-3 pb-0"
    >
      <Alert.Heading>Ошибка с файлом!</Alert.Heading>
      <p>{ errorFileMessage }</p>
    </Alert>
  );
};

export default ErrorFileAlert;