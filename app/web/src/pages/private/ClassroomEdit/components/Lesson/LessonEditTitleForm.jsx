import React from "react";
import { Form, InputGroup, Stack } from "react-bootstrap";
import { LESSON_MAX_TITLE_LENGTH } from "../../../../../constants/Lesson/LessonConstants";

const LessonEditTitleForm = ({ module, lesson, handleLessonTitleChange }) => {
  return (
    <div>
      <Stack direction="horizontal">
        <Form.Label className="mb-0">{ "Название урока" }</Form.Label>
        <Form.Text className="ms-auto">{ `${ lesson.title.length } / ${ LESSON_MAX_TITLE_LENGTH }` }</Form.Text>
      </Stack>
      <InputGroup>
        <InputGroup.Text>{ `${ module.order }.${ lesson.order }` }</InputGroup.Text>
        <Form.Control
          required
          type="text"
          minLength={1}
          maxLength={LESSON_MAX_TITLE_LENGTH}
          className="border border-info"
          placeholder={"Название урока"}
          onChange={handleLessonTitleChange}
        />
      </InputGroup>
    </div>
  );
};

export default LessonEditTitleForm;