import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CLASSROOM_PREFIX } from "../../../../API/Classroom/ClassroomPrefix";
import UserStepService from "../../../../API/UserStep/UserStepService";
import Loader from "../../../../components/UI/Loader/Loader";
import { LOADING_TEXT } from "../../../../components/UI/Loader/LoaderConstants";
import { useFetching } from "../../../../hooks/useFetching";
import { UserStepNotFoundExceptionDetail } from "../constants";
import StepStatus from "./StepStatus";

const CheckTableData = ({ task, student, classroom }) => {
  const [userStep, setUserStep] = useState(null);
  const navigate = useNavigate();

  const [fetchUserStep, isFetchingLoading, fetchingError] = useFetching(
    async () => {
      const userStep = await UserStepService.getUserStep(task.id, student.uuid);
      setUserStep(userStep);
    }
  );

  useEffect(() => {
    fetchUserStep();
  }, []);

  return (
    <>
      { fetchingError || (userStep && userStep.detail && userStep.detail !== UserStepNotFoundExceptionDetail) ? (
        navigate("/error", { replace: true })
      ) : isFetchingLoading ? (
        <Loader title={ LOADING_TEXT }/>
      ) : (
        <td
          className={ `${ userStep.detail ? "table-secondary" : userStep.status === StepStatus.CORRECT ? "table-success" : "table-danger" } p-0 text-center` }
          title={ userStep.detail ? "Нет решения" : userStep.status === StepStatus.CORRECT ? "Решено верно" : "Решено неверно" }
        >
          { !userStep.detail ? (
            <Link
              to={ `/${ CLASSROOM_PREFIX }/${ classroom.id }/check/${ task.id }/${ student.uuid }` }
              className="fw-medium fs-4 "
              style={{textDecoration: "none"}}
              target="_blank"
            >
              { userStep.status === StepStatus.CORRECT ? "✅" : "❌" }
            </Link>
          ) : (
            <span className="fw-medium fs-4">🔲</span>
          ) }
        </td>
      ) }
    </>
  );
};

export default CheckTableData;