import React from "react";
import { Form, Stack } from "react-bootstrap";
import { STEP_MAX_ANSWER_LENGTH } from "../../../../constants/Steps/StepConstants";

const StepAnswer = ({ step }) => {
  return (
    <Stack direction="vertical" className="border border-primary rounded p-3 pt-2 my-3">
      <div>
        <Stack direction="horizontal">
          <Form.Label className="mb-0">Верный ответ</Form.Label>
          <Form.Text className="ms-auto">{ `${ step.answer.length } / ${ STEP_MAX_ANSWER_LENGTH }` }</Form.Text>
        </Stack>
        <Form.Control
          size="lg"
          className="border border-success"
          type="text"
          readOnly
          value={ step.answer }/>
      </div>
    </Stack>
  );
};

export default StepAnswer;