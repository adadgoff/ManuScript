import React from "react";
import StepType from "../../enums/StepType";
import StepEditAnswerForm from "./StepEditAnswerForm";
import StepEditTextForm from "./StepEditTextForm";
import StepEditTypeForm from "./StepEditTypeForm";

const StepEditSyllabus = ({ step, updatedLesson, setUpdatedLesson }) => {
  return (
    <div>
      <StepEditTypeForm step={ step }
                        updatedLesson={ updatedLesson }
                        setUpdatedLesson={ setUpdatedLesson }/>

      {/*<StepEditTextForm step={ step }*/}
      {/*                  updatedLesson={ updatedLesson }*/}
      {/*                  setUpdatedLesson={ setUpdatedLesson }/>*/}

      { step.type === StepType.TASK && <StepEditAnswerForm step={ step }
                                                           updatedLesson={ updatedLesson }
                                                           setUpdatedLesson={ setUpdatedLesson }/> }
    </div>
  );
};

export default StepEditSyllabus;