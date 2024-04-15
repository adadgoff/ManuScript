import React from "react";
import { Button, Form, InputGroup, Stack } from "react-bootstrap";
import { LESSON_MAX_TITLE_LENGTH } from "../../../../../constants/Lesson/LessonConstants";

const LessonEditItem = ({
                          module, lesson,
                          handleLessonTitleChange,
                          handleUpBtn,
                          handleDownBtn,
                          handleEditBtn,
                          handleDeleteBtn,
                        }) => {
  return (
    <div className="mb-2">
      <Stack direction="horizontal">
        <Form.Label className="mb-0">Название урока</Form.Label>
        <Form.Text className="ms-auto">{ `${ lesson.title.length } / ${ LESSON_MAX_TITLE_LENGTH }` }</Form.Text>
      </Stack>
      <InputGroup>
        <Button
          variant="outline-info"
          className="p-1 fs-5"
          onClick={ handleUpBtn }
          title="Переместить урок вверх."
          aria-label="Переместить урок вверх."
          disabled={ lesson.order === 1 }
          children={ "🔼" }/>
        <Button
          variant="outline-info"
          className="p-1 fs-5"
          onClick={ handleDownBtn }
          title="Переместить урок вниз."
          aria-label="Переместить урок вниз."
          disabled={ lesson.order === module.lessons.length }
          children={ "🔽" }/>
        <InputGroup.Text>{ `${ module.order }.${ lesson.order }` }</InputGroup.Text>
        <Form.Control
          required
          type="text"
          minLength={ 1 }
          maxLength={ LESSON_MAX_TITLE_LENGTH }
          className="border border-info"
          placeholder={ "Название урока" }
          onChange={ handleLessonTitleChange }
          value={ lesson.title }
        />
        <Button
          variant="outline-success"
          className="p-1 fs-5"
          onClick={ handleEditBtn }
          title="Перейти на страницу редактирования урока."
          aria-label="Перейти на страницу редактирования урока."
          hidden={ !lesson.id }
          children={ "🖊️" }/>
        <Button
          variant="outline-danger"
          className="p-1 fs-5"
          title="Удалить урок."
          aria-label="Удалить урок."
          onClick={ handleDeleteBtn }
          children={ "🗑️" }/>

        <Form.Control.Feedback type="invalid" className="mt-0">Название урока не должно быть
          пустым!</Form.Control.Feedback>
      </InputGroup>
    </div>
  );
};

export default LessonEditItem;