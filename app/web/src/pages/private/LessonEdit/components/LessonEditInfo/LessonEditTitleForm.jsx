import React from "react";
import { Form, Stack } from "react-bootstrap";
import { LESSON_MAX_TITLE_LENGTH } from "../../../../../constants/Lesson/LessonConstants";

const LessonEditTitleForm = ({ updatedLesson, handleLessonTitleChange }) => {
  return (
    <div>
      <Stack direction="horizontal">
        <Form.Label className="mb-0">Название урока</Form.Label>
        <Form.Text
          className="ms-auto">{ `${ updatedLesson.title.length } / ${ LESSON_MAX_TITLE_LENGTH }` }</Form.Text>
      </Stack>
      <Form.Control
        required
        type="text"
        size="lg"
        minLength={ 1 }
        maxLength={ LESSON_MAX_TITLE_LENGTH }
        className="border border-info rounded"
        placeholder={ "Название урока" }
        onChange={ handleLessonTitleChange }
        value={ updatedLesson.title }/>
      <Form.Control.Feedback type="invalid" children={ "Название урока не должно быть пустым!" }/>
    </div>
  );
};

export default LessonEditTitleForm;