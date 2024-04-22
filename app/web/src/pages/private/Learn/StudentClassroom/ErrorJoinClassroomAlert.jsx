import React from "react";
import { Alert } from "react-bootstrap";

const ErrorJoinClassroomAlert = ({ errorMessage, setErrorMessage, ...props }) => {
  return (
    <Alert
      variant="danger"
      onClose={ () => setErrorMessage("") }
      dismissible
      className="my-3"
      { ...props }
    >
      <Alert.Heading>Ошибка с присоединением в учебный класс!</Alert.Heading>
      <p className="mb-0">{ errorMessage }</p>
    </Alert>
  );
};

export default ErrorJoinClassroomAlert;