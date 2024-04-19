import React from "react";
import { Alert } from "react-bootstrap";

const StudentAddAlert = ({ errorMessage, setErrorMessage, ...props }) => {
  return (
    <Alert
      variant="danger"
      onClose={ () => setErrorMessage("") }
      dismissible
      className="my-3"
      { ...props }
    >
      <Alert.Heading>Ошибка с добавлением учащегося!</Alert.Heading>
      <p className="mb-0">{ errorMessage }</p>
    </Alert>
  );
};

export default StudentAddAlert;