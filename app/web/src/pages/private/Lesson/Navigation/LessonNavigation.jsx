import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CLASSROOM_PREFIX } from "../../../../constants/classrooms";
import { BACK, FORWARD } from "./constants";

const Navigation = ({ ...props }) => {
  const navigate = useNavigate();

  return (
    <Navbar
      style={ { borderWidth: "2px" } }
      className="d-flex align-items-center justify-content-center border border-info rounded my-3">

      <Button
        className="align-items-center"
        children={ "Вернуться к содержанию" }
        onClick={ () => navigate(`${ CLASSROOM_PREFIX }`) }
      />

      <Button
        className="align-items-center"
        children={ BACK }
        onClick={ () => props.currentStep.order > 1 && props.setCurrentStep(props.steps[props.currentStep.order - 2]) }
        disabled={ !props.steps || props.currentStep.order === 1 }
      />

      <text
        className="align-items-center mx-3 fw-bold"
        style={ { lineHeight: "normal" } }
      >
        { `Шаг ${ props.currentStep.order } из ${ props.steps.length }` }
      </text>

      <Button
        className="align-items-center"
        children={ FORWARD }
        onClick={ () => props.setCurrentStep(props.steps[props.currentStep.order]) }
        disabled={ !props.steps || props.currentStep.order === props.steps.length }
      />
    </Navbar>
  );
};

export default Navigation;