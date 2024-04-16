import React from "react";
import Step from "./Step";

const Steps = ({ updatedLesson, setUpdatedLesson }) => {
  return (
    <div>
      { updatedLesson.steps && updatedLesson.steps.length ? (
        updatedLesson.steps.map((step, index) => (
          <>
            <Step
              step={ step }
              updatedLesson={ updatedLesson }
              setUpdatedLesson={ setUpdatedLesson }/>
            { index !== updatedLesson.steps.length - 1 && <div className="my-4 border border-warning border-2"/> }
          </>
        ))
      ) : (
        <h5 className="text-center bg-info-subtle border border-primary-subtle border-2 rounded p-3 mx-2 mt-4">Шагов в
          уроке нет...</h5>
      ) }
    </div>
  );
};

export default Steps;