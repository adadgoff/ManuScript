import React from "react";
import { Form } from "react-bootstrap";
import StepType from "../../enums/StepType";

const StepEditTypeForm = ({ step, updatedLesson, setUpdatedLesson }) => {
  const handleTypeChange = (event) => {
    const stepOrder = step.order;
    // TODO: make translatable.
    // const type = event.target.value;
    const type = event.target.value === "Теория" ? StepType.INFO : StepType.TASK;

    const updatedSteps = updatedLesson.steps.map(step => {
      if (step.order === stepOrder) {
        return { ...step, type: type, answer: type === "Теория" ? null : "" };
      }
      return step;
    });

    setUpdatedLesson({ ...updatedLesson, steps: updatedSteps });
  }

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