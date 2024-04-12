import React from "react";
import { Form, Stack } from "react-bootstrap";
import { CLASSROOM_MAX_TITLE_LENGTH } from "../../../../../constants/Classroom/ClassroomConstants";

const LessonEditTitleForm = ({ updatedLesson, handleLessonTitleChange }) => {
  return (
    <>
      <Stack direction="horizontal">
        <Form.Label className="mb-0">Название урока</Form.Label>
        <Form.Text
          className="ms-auto">{ `${ updatedLesson.title.length } / ${ CLASSROOM_MAX_TITLE_LENGTH }` }</Form.Text>
      </Stack>
      <Form.Control
        required
        type="text"
        size="lg"
        minLength={ 1 }
        maxLength={ CLASSROOM_MAX_TITLE_LENGTH }
        className="border border-info rounded"
        placeholder={ "Название учебного класса" }
        onChange={ handleLessonTitleChange }
        value={ updatedLesson.title }/>
      <Form.Control.Feedback type="invalid" children={ "Название класса не должно быть пустым!" }/>
    </>
  );
};

export default LessonEditTitleForm;