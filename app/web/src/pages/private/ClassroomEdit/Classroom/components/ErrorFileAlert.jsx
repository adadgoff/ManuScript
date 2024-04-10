import React from "react";
import { Alert } from "react-bootstrap";

const ErrorFileAlert = ({ ...props }) => {
  return (
    <Alert
      variant="danger"
      onClose={ () => props.setErrorFileMessage("") }
      dismissible
      className="my-3"
    >
      <Alert.Heading>Ошибка с файлом!</Alert.Heading>
      <p>{ props.errorFileMessage }</p>
    </Alert>
  );
};

export default ErrorFileAlert;