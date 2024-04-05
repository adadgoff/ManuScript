import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClassroomService from "../../../../API/ClassroomService";
import { useFetching } from "../../../../hooks/useFetching";
import ClassroomForm from "./ClassroomForm";

const Classroom = () => {
  const params = useParams();
  const [classroom, setClassroom] = useState([]);
  const navigate = useNavigate();

  const [fetchClassroom, isFetchingLoading, fetchingError] = useFetching(
    async () => {
      const studentClassroom = await ClassroomService.getClassroom(params.id);
      setClassroom(studentClassroom);
    }
  );

  useEffect(() => {
    fetchClassroom();
  }, []);

  return (
    <>
      { fetchingError || classroom.detail ? (
        navigate("/error", { replace: true })
      ) : (
        <ClassroomForm
          classroom={ classroom }
          isLoading={ isFetchingLoading }
        />
      ) }
    </>
  );
}

export default Classroom;