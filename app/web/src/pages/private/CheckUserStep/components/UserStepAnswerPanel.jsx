import React from "react";
import { Form, Image, Stack } from "react-bootstrap";
import { IMAGE_PATH } from "../../../../API/Paths";
import { STEP_MAX_ANSWER_LENGTH } from "../../../../constants/Steps/StepConstants";
import StepStatus from "../../Check/components/StepStatus";

const UserStepAnswerPanel = ({ step, userStep }) => {
  return (
    <Stack direction="vertical" className="border border-primary rounded p-3 pt-2 pb-4 my-4">
      <div className="mb-2">
        <Stack direction="horizontal">
          <Form.Label className="mb-0">Верный ответ</Form.Label>
          <Form.Text
            className="ms-auto">{ `${ step.answer.length } / ${ STEP_MAX_ANSWER_LENGTH }` }</Form.Text>
        </Stack>
        <Form.Control
          size="lg"
          className="border border-success"
          type="text"
          readOnly
          value={ step.answer }/>
      </div>

      <div className="mb-2">
        <Stack direction="horizontal">
          <Form.Label className="mb-0">Ответ учащегося</Form.Label>
          <Form.Text
            className="ms-auto">{ `${ userStep.user_answer.length } / ${ STEP_MAX_ANSWER_LENGTH }` }</Form.Text>
        </Stack>
        <Form.Control
          size="lg"
          className={ `border ${ userStep.status === StepStatus.CORRECT ? "border-success" : "border-danger" }` }
          type="text"
          readOnly
          value={ userStep.user_answer }/>
      </div>

      <div>
        <Stack direction="horizontal">
          <Form.Label className="mb-0">Прикрепленная работа учащегося</Form.Label>
        </Stack>
        <Image src={ `${ IMAGE_PATH }/${ userStep.user_image_uuid }` } thumbnail
               className={ `border ${ userStep.status === StepStatus.CORRECT ? "border-success" : "border-danger" }` }/>
      </div>
    </Stack>
  );
};

export default UserStepAnswerPanel;