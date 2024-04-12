import React, { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { LESSON_MAX_TITLE_LENGTH } from "../../../../../constants/Lesson/LessonConstants";

const LessonCreateForm = ({ ...props }) => {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <Form noValidate validated={ validated } onSubmit={ handleSubmit } className="mb-3">
      <Stack direction="horizontal">
        <div className="w-100">
          <Stack direction="horizontal">
            <Form.Label className="mb-0">Название урока</Form.Label>
            <Form.Text className="ms-auto">{ `${ title.length } / ${ LESSON_MAX_TITLE_LENGTH }` }</Form.Text>
          </Stack>
          <Form.Control
            required
            type="text"
            minLength={ 1 }
            maxLength={ LESSON_MAX_TITLE_LENGTH }
            className="border border-info rounded"
            placeholder={ "Название урока" }
            onChange={ event => setTitle(event.target.value) }
            { ...props }
          />
          <Form.Control.Feedback type="invalid" children={ "Название урока не должно быть пустым!" }/>
        </div>

        <div className="ms-auto">
          <Button
            className="h-50"
            variant="outline-success"
            type="submit"
            children={ "Создать урок" }/>
        </div>
      </Stack>
    </Form>
  );
};

export default LessonCreateForm;

// <div>
//   <Stack direction="horizontal">
//     <Form.Label className="mb-0">Название урока</Form.Label>
//     <Form.Text className="ms-auto">{ `${ title.length } / ${ LESSON_MAX_TITLE_LENGTH }` }</Form.Text>
//   </Stack>
//   <Form.Control
//     required
//     size="lg"
//     type="text"
//     minLength={ 1 }
//     maxLength={ LESSON_MAX_TITLE_LENGTH }
//     className="border border-info rounded"
//     placeholder={ "Название урока" }
//     onChange={ event => setTitle(event.target.value) }
//     { ...props }
//   />
//   <Form.Control.Feedback type="invalid" children={ "Название урока не должно быть пустым!" }/>
// </div>