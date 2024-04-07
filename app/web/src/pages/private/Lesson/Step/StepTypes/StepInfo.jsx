import React from "react";
import StepText from "../StepText";
import StepType from "../StepType";

const StepInfo = ({ ...props }) => {
  return (
    <>
      <StepType step={props.step}/>
      <StepText step={ props.step }/>
    </>
  );
};

export default StepInfo;