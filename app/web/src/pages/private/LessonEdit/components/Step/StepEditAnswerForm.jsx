import React from "react";
import { Form, Stack } from "react-bootstrap";
import { STEP_MAX_ANSWER_LENGTH } from "../../../../../constants/Steps/StepConstants";

const StepEditAnswerForm = ({ step, updatedLesson, setUpdatedLesson }) => {
  const handleAnswerChange = (event) => {
    const stepOrder = step.order;
    const answer = event.target.value;

    const updatedSteps = updatedLesson.steps.map(step => {
      if (step.order === stepOrder) {
        return { ...step, answer: answer };
      }
      return step;
    });

    setUpdatedLesson({ ...updatedLesson, steps: updatedSteps });
  };

  console.log(updatedLesson.steps);

  return (
    <div>
      <Stack direction="horizontal">
        <Form.Label className="mb-0">Верный ответ задания</Form.Label>
        <Form.Text
          className="ms-auto">{ `${ step.answer.length } / ${ STEP_MAX_ANSWER_LENGTH }` }</Form.Text>
      </Stack>
      <Form.Control
        size="lg"
        required
        type="text"
        minLength={ 1 }
        maxLength={ STEP_MAX_ANSWER_LENGTH }
        className="border border-info rounded"
        placeholder={ "Укажите верный ответ к заданию" }
        onChange={ handleAnswerChange }
        defaultValue={ step.answer }
      />
      <Form.Control.Feedback type="invalid" children={ "Ответ не должен быть пустым!" }/>
    </div>
  );
};

export default StepEditAnswerForm;