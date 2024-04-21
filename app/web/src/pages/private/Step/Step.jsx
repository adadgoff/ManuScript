import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StepService from "../../../API/Step/StepService";
import Loader from "../../../components/UI/Loader/Loader";
import { LOADING_TEXT } from "../../../components/UI/Loader/LoaderConstants";
import { useFetching } from "../../../hooks/useFetching";
import StepPage from "./components/StepPage";

const Step = () => {
  const params = useParams();
  const [step, setStep] = useState(null);
  const navigate = useNavigate();

  const [fetchStep, isFetchingLoading, fetchingError] = useFetching(
    async () => {
      const step = await StepService.getStep(params.id);
      setStep(step);
    }
  );

  useEffect(() => {
    fetchStep();
  }, []);

  return (
    <>
      { fetchingError || (step && step.detail) ? (
        navigate("/error", { replace: true })
      ) : isFetchingLoading ? (
        <Loader title={ LOADING_TEXT }/>
      ) : (
        <StepPage step={ step }/>
      ) }
    </>
  );
};

export default Step;