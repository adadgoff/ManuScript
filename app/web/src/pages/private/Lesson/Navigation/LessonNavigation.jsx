import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { BACK, FORWARD } from "./constants";

const LessonNavigation = ({ ...props }) => {
  return (
    <>
      <Navbar
        style={ { borderWidth: "2px" } }
        className="justify-content-center d-flex align-items-center border border-info rounded my-3">

        <Button
          onClick={ () => props.currentStep.order > 1 && props.setCurrentStep(props.steps[props.currentStep.order - 2]) }
          disabled={ !props.currentStep || props.currentStep.order === 1 }
        >
          { BACK }
        </Button>

        <span className="mx-3 fw-bold justify-content-center">
          { `Шаг ${ props.currentStep ? props.currentStep.order : "-" } из ${ props.steps.length ? props.steps.length : "-" }` }
        </span>

        <Button
          onClick={ () => props.setCurrentStep(props.steps[props.currentStep.order]) }
          disabled={ !props.currentStep || props.currentStep.order === props.steps.length }
        >
          { FORWARD }
        </Button>

      </Navbar>
    </>
  );
};

export default LessonNavigation;