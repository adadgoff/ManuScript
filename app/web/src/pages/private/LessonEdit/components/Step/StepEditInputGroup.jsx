import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { LESSON_MAX_TITLE_LENGTH } from "../../../../../constants/Lesson/LessonConstants";

const StepEditInputGroup = ({ updatedLesson, step, handleUpBtn, handleDownBtn, handleDeleteBtn }) => {
  const handleBtnGroupClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <div className="me-3 w-100">
      <InputGroup
        size="lg"
        onClick={ handleBtnGroupClick }>
        <Button
          variant="outline-primary"
          className="p-1 px-2 fs-4 text-center"
          onClick={ handleUpBtn }
          title="Переместить урок вверх."
          aria-label="Переместить урок вверх."
          disabled={ step.order === 1 }
          children={ "🔼" }/>
        <Button
          variant="outline-primary"
          className="p-1 px-2 fs-4"
          onClick={ handleDownBtn }
          title="Переместить урок вниз."
          aria-label="Переместить урок вниз."
          disabled={ step.order === updatedLesson.steps.length }
          children={ "🔽" }/>
        <Button
          variant="outline-danger"
          className="p-1 px-2 fs-4"
          title="Удалить урок."
          aria-label="Удалить урок."
          onClick={ handleDeleteBtn }
          children={ "🗑️" }/>
        <Form.Control
          required
          readOnly
          type="text"
          minLength={ 1 }
          maxLength={ LESSON_MAX_TITLE_LENGTH }
          className="border border-secondary"
          value={ `Шаг ${ step.order } из ${ updatedLesson.steps.length }` }/>
      </InputGroup>
    </div>
  );
};

export default StepEditInputGroup;