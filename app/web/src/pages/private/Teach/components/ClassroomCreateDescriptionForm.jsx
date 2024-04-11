import React from "react";
import { Form, Stack } from "react-bootstrap";
import { CLASSROOM_MAX_DESCRIPTION_LENGTH } from "../../../../constants/Classroom/ClassroomConstants";

const ClassroomCreateDescriptionForm = ({ description, setDescription, ...props }) => {
  return (
    <>
      <Stack direction="horizontal">
        <Form.Label className="mb-0">Описание учебного класса</Form.Label>
        <Form.Text
          className="ms-auto">{ `${ description.length } / ${ CLASSROOM_MAX_DESCRIPTION_LENGTH }` }</Form.Text>
      </Stack>
      <Form.Control
        required
        as="textarea"
        minLength={ 1 }
        maxLength={ CLASSROOM_MAX_DESCRIPTION_LENGTH }
        className="border border-info rounded"
        placeholder={ "Описание учебного класса" }
        onChange={ event => setDescription(event.target.value) }
        { ...props }
      />
      <Form.Control.Feedback type="invalid" children={ "Описание класса не должно быть пустым!" }/>
    </>
  );
};

export default ClassroomCreateDescriptionForm;