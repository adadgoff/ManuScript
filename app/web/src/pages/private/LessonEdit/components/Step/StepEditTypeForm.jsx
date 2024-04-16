import React from "react";
import { Form } from "react-bootstrap";
import StepType from "../../enums/StepType";

const StepEditTypeForm = ({ step, handleTypeChange }) => {
  return (
    <div className="mb-3">
      <Form.Label className="mb-0">Тип шага</Form.Label>
      <Form.Select size="lg border border-info" onChange={ handleTypeChange }
                   value={ step.type === StepType.INFO ? "Теория" : "Задание" }>
        {/*<option>{ StepType.INFO }</option>*/ }
        {/*<option>{ StepType.TASK }</option>*/ }
        <option>{ "Теория" }</option>
        <option>{ "Задание" }</option>
      </Form.Select>
    </div>
  );
};

export default StepEditTypeForm;