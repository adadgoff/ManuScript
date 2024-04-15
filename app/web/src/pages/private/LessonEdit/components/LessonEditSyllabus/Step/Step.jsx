import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import StepDeleteModal from "../../Step/StepDeleteModal";
import StepEditInputGroup from "../../Step/StepEditInputGroup";
import StepEditSyllabus from "../../Step/StepEditSyllabus";

const Step = ({ step, updatedLesson, setUpdatedLesson }) => {
  const [modalShow, setModalShow] = useState(false);

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

    setUpdatedLesson(prevState => ({
      ...prevState,
      steps: updatedSteps,
    }));
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

    setUpdatedLesson(prevState => ({
      ...prevState,
      steps: updatedSteps,
    }));
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
                                handleUpBtn={ handleUpBtn }
                                handleDownBtn={ handleDownBtn }
                                handleDeleteBtn={ handleDeleteBtn }/>
          </Accordion.Button>

          <Accordion.Body className="border border-secondary-subtle border-2 rounded p-3 pt-2 pb-4">
            <StepEditSyllabus step={ step }
                              updatedLesson={ updatedLesson }
                              setUpdatedLesson={ setUpdatedLesson }/>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default Step;