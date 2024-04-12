import React from "react";
import { Form } from "react-bootstrap";
import { CLASSROOM_MAX_DESCRIPTION_LENGTH } from "../../../../../constants/Classroom/ClassroomConstants";

const ClassroomEditDescriptionForm = ({ updatedClassroom, handleClassroomDescriptionChange }) => {
  return (
    <>
      <Form.Text>{ `${ updatedClassroom.description.length } / ${ CLASSROOM_MAX_DESCRIPTION_LENGTH }` }</Form.Text>
      <Form.Control
        required
        as="textarea"
        minLength={ 1 }
        maxLength={ CLASSROOM_MAX_DESCRIPTION_LENGTH }
        className="border border-info rounded"
        placeholder={ "Описание учебного класса" }
        onChange={ handleClassroomDescriptionChange }
        value={ updatedClassroom.description }/>
      <Form.Control.Feedback type="invalid" children={ "Описание класса не должно быть пустым!" }/>
    </>
  );
};

export default ClassroomEditDescriptionForm;