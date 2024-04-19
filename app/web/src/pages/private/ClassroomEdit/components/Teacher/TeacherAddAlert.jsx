import React from "react";
import { Alert } from "react-bootstrap";

const TeacherAddAlert = ({ errorMessage, setErrorMessage, ...props }) => {
  return (
    <Alert
      variant="danger"
      onClose={ () => setErrorMessage("") }
      dismissible
      className="my-3"
      { ...props }
    >
      <Alert.Heading>Ошибка с добавлением преподавателя!</Alert.Heading>
      <p className="mb-0">{ errorMessage }</p>
    </Alert>
  );
};

export default TeacherAddAlert;