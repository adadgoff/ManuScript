import React from "react";
import { Accordion, Button } from "react-bootstrap";
import StepType from "../enums/StepType";
import Steps from "../components/LessonEditSyllabus/Step/Steps";

const LessonEditSyllabus = ({ updatedLesson, setUpdatedLesson }) => {
  const handleCreateStepClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const newStep = {
      id: null,
      order: updatedLesson.steps.length + 1,
      text: "Редактируйте содержимое шага :)",
      type: StepType.INFO,
      answer: "",
    };
    const updatedSteps = [...updatedLesson.steps, newStep];
    setUpdatedLesson({ ...updatedLesson, steps: updatedSteps });
  };

  return (
    <>
      <Accordion className="border border-warning border-3 rounded-3 my-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span className="fw-medium">Программа урока</span>
          </Accordion.Header>

          <Accordion.Body className="p-0">
            <div className="my-4 border border-warning border-2"/>

            <Steps steps={ updatedLesson.steps }
                   updatedLesson={ updatedLesson }
                   setUpdatedLesson={ setUpdatedLesson }/>

            <div className="mt-4 border border-warning border-2"/>
          </Accordion.Body>

          <Accordion.Body>
            <Button
              onClick={ handleCreateStepClick }
              className="btn-success w-100"
              children={ "Добавить шаг" }/>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default LessonEditSyllabus;