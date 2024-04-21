import React, { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import UserStepService from "../../../../API/UserStep/UserStepService";
import StepStatus from "../../Check/components/StepStatus";
import UserStepSavingModal from "./UserStepSavingModal";

const UserStepChangePanel = ({ step, user, userStep, setUserStep }) => {
  const [saveModalShow, setSaveModalShow] = useState(false);

  const handleChangeToCorrect = async (event) => {
    try {
      setSaveModalShow(true);
      const response = await UserStepService.toCorrectUserStep(step.id, user.uuid);
      setUserStep(prevState => ({ ...prevState, status: response.status }));
    } catch (error) {
      console.log("Error updating status user step", error);
    } finally {
      setSaveModalShow(false);
    }
  };

  const handleChangeToIncorrect = async (event) => {
    try {
      setSaveModalShow(true);
      const response = await UserStepService.toIncorrectUserStep(step.id, user.uuid);
      setUserStep(prevState => ({ ...prevState, status: response.status }));
    } catch (error) {
      console.log("Error updating status user step", error);
    } finally {
      setSaveModalShow(false);
    }
  };

  return (
    <>
      <UserStepSavingModal show={ saveModalShow }/>

      <div>
        <Stack direction="horizontal" gap={ 3 } className="border border-primary rounded p-3 my-4">
          <Button variant="outline-success"
                  className="w-100 fw-medium"
                  children={ "Отметить верным" }
                  disabled={ userStep.status === StepStatus.CORRECT }
                  onClick={ handleChangeToCorrect }/>

          <Button variant="outline-danger"
                  className="w-100 fw-medium"
                  children={ "Отметить неверным" }
                  disabled={ userStep.status === StepStatus.INCORRECT }
                  onClick={ handleChangeToIncorrect }/>
        </Stack>
      </div>
    </>
  );
};

export default UserStepChangePanel;