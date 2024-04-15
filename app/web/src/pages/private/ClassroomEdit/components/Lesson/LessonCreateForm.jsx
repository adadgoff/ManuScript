import React, { useState } from "react";
import { Button, Form, InputGroup, Stack } from "react-bootstrap";
import { LESSON_MAX_TITLE_LENGTH } from "../../../../../constants/Lesson/LessonConstants";

const LessonCreateForm = ({ module, updatedClassroom, setUpdatedClassroom, ...props }) => {
  const [title, setTitle] = useState("");

  const handleLessonTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleCreateLessonClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setTitle("");

    const moduleOrder = module.order;

    setUpdatedClassroom(prevState => {
      const updatedModules = prevState.modules.map(module => {
        if (module.order === moduleOrder) {
          const newLesson = {
            id: null,
            title: title,
            order: module.lessons.length + 1,
            module_id: null,
          };

          const updatedLessons = [...module.lessons, newLesson];
          return { ...module, lessons: updatedLessons };
        }

        return module;
      });

      return { ...prevState, modules: updatedModules };
    });
  };

  return (
    <Form noValidate className="w-100 me-2">
      <Stack direction="horizontal">
        <Form.Label className="mb-0">Название нового урока</Form.Label>
        <Form.Text className="ms-auto">{ `${ title.length } / ${ LESSON_MAX_TITLE_LENGTH }` }</Form.Text>
      </Stack>
      <InputGroup>
        <Form.Control
          required
          type="text"
          minLength={ 1 }
          maxLength={ LESSON_MAX_TITLE_LENGTH }
          className="border border-success-subtle"
          placeholder="Название нового урока"
          onChange={ handleLessonTitleChange }
          value={ title }/>

        <Button
          className="btn-success"
          onClick={ handleCreateLessonClick }
          disabled={ title.length === 0 }
          children={ "Создать урок" }/>
      </InputGroup>
    </Form>
  );
};

export default LessonCreateForm;
