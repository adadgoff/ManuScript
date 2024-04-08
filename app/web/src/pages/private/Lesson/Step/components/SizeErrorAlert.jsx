import React from "react";
import { Alert } from "react-bootstrap";

const SizeErrorAlert = ({ ...props }) => {
  return (
    <Alert
      variant="danger"
      onClose={ () => props.setSizeError(false) }
      dismissible
      className="my-3"
    >
      <Alert.Heading>Слишком большой файл!</Alert.Heading>
      <p>Пожалуйста, выберите файл с размером до 5 MB.</p>
    </Alert>
  );
};

export default SizeErrorAlert;