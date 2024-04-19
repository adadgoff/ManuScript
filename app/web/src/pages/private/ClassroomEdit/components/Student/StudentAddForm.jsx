import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import ClassroomService from "../../../../../API/Classroom/ClassroomService";
import { EMAIL_MAX_LENGTH, EMAIL_REGEX } from "../../../../../constants/Auth/AuthConstants";
import StudentAddAlert from "./StudentAddAlert";
import StudentSavingModal from "./StudentSavingModal";

const StudentAddForm = ({ classroom, updatedStudents, setStudents }) => {
  const [saveModalShow, setSaveModalShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    setValidated(true);

    if (form.checkValidity() === true) {
      try {
        setSaveModalShow(true);
        const response = await ClassroomService.addStudent(classroom.id, email);
        if (response.detail) {
          setErrorMessage(response.detail);
          return;
        }
        setStudents([...updatedStudents, response]);
        setEmail("");
      } catch (error) {
        console.log("Error adding student", error);
      } finally {
        setSaveModalShow(false);
      }
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  return (
    <>
      <StudentSavingModal show={ saveModalShow }/>

      <StudentAddAlert errorMessage={ errorMessage }
                       setErrorMessage={ setErrorMessage }
                       show={ errorMessage }/>

      <Form noValidate validated={ validated } onSubmit={ handleSubmit }>
        <Form.Label className="mb-0">Почта нового учащегося</Form.Label>
        <InputGroup>
          <Form.Control
            required
            type="text"
            minLength={ 1 }
            maxLength={ EMAIL_MAX_LENGTH }
            pattern={ EMAIL_REGEX.source }
            className="border border-secondary"
            onChange={ handleEmailChange }
            value={ email }
            placeholder={"Введите почту нового учащегося"}
          />

          <Button
            className="btn-success"
            children="Добавить учащегося"
            type="submit"
            disabled={ !email }
          />
          <Form.Control.Feedback type="invalid"
                                 children={ "Введите корректную электронную почту!" }/>
        </InputGroup>
      </Form>
    </>
  );
};

export default StudentAddForm;