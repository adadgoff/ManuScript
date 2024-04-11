import React from "react";
import { Form, Stack } from "react-bootstrap";
import { CLASSROOM_MAX_TITLE_LENGTH } from "../../../../constants/Classroom/ClassroomConstants";

const ClassroomCreateTitleForm = ({ title, setTitle, ...props }) => {
  return (
    <>
      <Stack direction="horizontal">
        <Form.Label className="mb-0">Название учебного класса</Form.Label>
        <Form.Text className="ms-auto">{ `${ title.length } / ${ CLASSROOM_MAX_TITLE_LENGTH }` }</Form.Text>
      </Stack>
      <Form.Control
        required
        size="lg"
        type="text"
        minLength={ 1 }
        maxLength={ CLASSROOM_MAX_TITLE_LENGTH }
        className="border border-info rounded"
        placeholder={ "Название учебного класса" }
        onChange={ event => setTitle(event.target.value) }
        { ...props }
      />
      <Form.Control.Feedback type="invalid" children={ "Название класса не должно быть пустым!" }/>
    </>
  );
};

export default ClassroomCreateTitleForm;