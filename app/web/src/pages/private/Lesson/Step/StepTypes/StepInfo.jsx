import React from "react";
import StepText from "../components/StepText";
import StepType from "../components/StepType";

const StepInfo = ({ ...props }) => {
  return (
    <>
      <StepType step={props.step}/>
      <StepText step={ props.step }/>
    </>
  );
};

export default StepInfo;