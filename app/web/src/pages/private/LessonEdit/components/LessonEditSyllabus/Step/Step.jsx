import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import StepType from "../../../enums/StepType";
import StepDeleteModal from "../../Step/StepDeleteModal";
import StepEditAnswerForm from "../../Step/StepEditAnswerForm";
import StepEditInputGroup from "../../Step/StepEditInputGroup";
import StepEditTextForm from "../../Step/StepEditTextForm";
import StepEditTypeForm from "../../Step/StepEditTypeForm";

const Step = ({ step, updatedLesson, setUpdatedLesson }) => {
  const [modalShow, setModalShow] = useState(false);

  const handleTypeChange = (event) => {
    const stepOrder = step.order;
    // TODO: make translatable.
    // const type = event.target.value;
    const newType = event.target.value === "Теория" ? StepType.INFO : StepType.TASK;

    const updatedSteps = updatedLesson.steps.map(step => {
      if (step.order === stepOrder) {
        return { ...step, type: newType, answer: newType === "Теория" ? null : "" };
      }
      return step;
    });

    setUpdatedLesson({ ...updatedLesson, steps: updatedSteps });
  }

  const handleAnswerChange = (event) => {
    const stepOrder = step.order;
    const newAnswer = event.target.value;

    const updatedSteps = updatedLesson.steps.map(step => {
      if (step.order === stepOrder) {
        return { ...step, answer: newAnswer };
      }
      return step;
    });

    setUpdatedLesson({ ...updatedLesson, steps: updatedSteps });
  };

  const handleUpBtn = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (step.order === 1) {
      return;
    }

    const stepOrder = step.order;
    const updatedSteps = [...updatedLesson.steps];

    updatedSteps[stepOrder - 2].order++;
    updatedSteps[stepOrder - 1].order--;
    [updatedSteps[stepOrder - 2], updatedSteps[stepOrder - 1]] = [updatedSteps[stepOrder - 1], updatedSteps[stepOrder - 2]];

    setUpdatedLesson({ ...updatedLesson, steps: updatedSteps });
  };

  const handleDownBtn = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (step.order === updatedLesson.steps.length) {
      return;
    }

    const stepOrder = step.order;
    const updatedSteps = [...updatedLesson.steps];

    updatedSteps[stepOrder - 1].order++;
    updatedSteps[stepOrder].order--;
    [updatedSteps[stepOrder - 1], updatedSteps[stepOrder]] = [updatedSteps[stepOrder], updatedSteps[stepOrder - 1]];

    setUpdatedLesson({ ...updatedLesson, steps: updatedSteps });
  };

  const handleDeleteBtn = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setModalShow(true);
  };

  return (
    <>
      <StepDeleteModal
        show={ modalShow }
        onHide={ () => setModalShow(false) }
        step={ step }
        updatedLesson={ updatedLesson }
        setUpdatedLesson={ setUpdatedLesson }/>

      <Accordion>
        <Accordion.Item eventKey="1">
          <Accordion.Button className="pt-3 pb-3 ps-2 pe-3 border border-secondary border-2 rounded">
            <StepEditInputGroup updatedLesson={ updatedLesson }
                                step={ step }
                                handleTypeChange={ handleTypeChange }
                                handleAnswerChange={ handleAnswerChange }
                                handleUpBtn={ handleUpBtn }
                                handleDownBtn={ handleDownBtn }
                                handleDeleteBtn={ handleDeleteBtn }/>
          </Accordion.Button>

          <Accordion.Body className="border border-secondary-subtle border-2 rounded p-3 pt-2 pb-4">
            <div>
              <StepEditTypeForm step={ step }
                                handleTypeChange={ handleTypeChange }/>

              <StepEditTextForm step={ step }
                                updatedLesson={ updatedLesson }
                                setUpdatedLesson={ setUpdatedLesson }/>

              { step.type === StepType.TASK &&
                <StepEditAnswerForm step={ step }
                                    handleAnswerChange={ handleAnswerChange }/> }
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default Step;