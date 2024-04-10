import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClassroomService from "../../../API/Classroom/ClassroomService";
import { useFetching } from "../../../hooks/useFetching";
import ClassroomEditForm from "./Classroom/ClassroomEditForm";

const ClassroomEdit = () => {
  const params = useParams();
  const [classroom, setClassroom] = useState([]);
  const navigate = useNavigate();

  const [fetchClassroom, isFetchingLoading, fetchingError] = useFetching(
    async () => {
      const teacherClassroom = await ClassroomService.getClassroomEdit(params.id);
      setClassroom(teacherClassroom);
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
        <ClassroomEditForm
          classroom={ classroom }
          isLoading={ isFetchingLoading }
        />
      ) }
    </>
  );
};

export default ClassroomEdit;