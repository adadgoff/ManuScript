import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StepService from "../../../../API/StepService";
import Loader from "../../../../components/UI/Loader/Loader";
import { LOADING_TEXT } from "../../../../constants/utils";
import { useFetching } from "../../../../hooks/useFetching";
import StepInfo from "./StepInfo";
import StepTask from "./StepTask";

const Step = ({ ...props }) => {
  const [step, setStep] = useState({});
  const navigate = useNavigate();

  const [fetchStep, isFetchingLoading, fetchingError] = useFetching(
    async () => {
      const step = await StepService.getStep(props.step.id);
      setStep(step);
    }
  )

  useEffect(() => {
    fetchStep();
  }, [props.step]);

  console.log(step);

  return (
    <>
      { fetchingError || step.detail ? (
        navigate(fetchingError ? "/error" : "/forbidden", { replace: true })
      ) : (
        isFetchingLoading ? (
          <Loader title={ LOADING_TEXT }/>
        ) : (
          step.type === "INFO" ? (
            <StepInfo step={ step }/>
          ) : (
            <StepTask step={ step }/>
          )
        )
      ) }
    </>
  );
};

export default Step;