import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StepService from "../../../API/Step/StepService";
import UserService from "../../../API/User/UserService";
import UserStepService from "../../../API/UserStep/UserStepService";
import Loader from "../../../components/UI/Loader/Loader";
import { LOADING_TEXT } from "../../../components/UI/Loader/LoaderConstants";
import { useFetching } from "../../../hooks/useFetching";
import CheckUserStepPage from "./components/CheckUserStepPage";

const CheckUserStep = () => {
  const params = useParams();

  const [userStep, setUserStep] = useState(null);
  const [step, setStep] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const [fetchUserStep, isFetchingUserStepLoading, fetchingUserStepError] = useFetching(
    async () => {
      const userStep = await UserStepService.getUserStep(params.id, params.uuid);
      setUserStep(userStep);
    }
  );

  const [fetchStep, isFetchingStepLoading, fetchingStepError] = useFetching(
    async () => {
      const step = await StepService.getStep(params.id);
      setStep(step);
    }
  );

  const [fetchUser, isFetchingUserLoading, fetchingUserError] = useFetching(
    async () => {
      const user = await UserService.getUser(params.uuid);
      setUser(user);
    }
  );

  useEffect(() => {
    fetchUserStep();
    fetchStep();
    fetchUser();
  }, []);

  return (
    <>
      {
        fetchingUserStepError || (userStep && userStep.detail) ||
        fetchingStepError || (step && step.detail) ||
        fetchingUserError || (user && user.detail) ? (
          navigate("/error", { replace: true })
        ) : isFetchingUserStepLoading || isFetchingStepLoading || isFetchingUserLoading ? (
          <Loader title={ LOADING_TEXT }/>
        ) : (
          <CheckUserStepPage userStep={ userStep }
                             step={ step }
                             user={ user }
                             setUserStep={ setUserStep }/>
        )
      }
    </>
  );
};

export default CheckUserStep;