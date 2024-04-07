import React from "react";

const StepType = ({ ...props }) => {
  return (
    <h5
      style={ { borderWidth: "2px" } }
      className="text-center border border-primary align-content-center rounded p-2 my-3">
      { props.step.type === "INFO" ? "Теория" : "Задание" }
    </h5>
  );
};

export default StepType;