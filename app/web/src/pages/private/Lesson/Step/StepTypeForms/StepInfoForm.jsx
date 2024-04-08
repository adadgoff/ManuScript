import React from "react";
import StepText from "../components/StepText";
import StepType from "../components/StepType";

const StepInfoForm = ({ ...props }) => {
  return (
    <>
      <StepType step={props.step}/>
      <StepText step={ props.step }/>
    </>
  );
};

export default StepInfoForm;