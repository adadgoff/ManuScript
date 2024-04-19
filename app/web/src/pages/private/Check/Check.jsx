import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClassroomService from "../../../API/Classroom/ClassroomService";
import { useFetching } from "../../../hooks/useFetching";

const Check = () => {
  const params = useParams();
  const [classroom, setClassroom] = useState({});
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const [fetchClassroom, isClassroomFetchingLoading, fetchingClassroomError] = useFetching(
    async () => {
      const classroom = await ClassroomService.getClassroomEdit(params.id);
      setClassroom(classroom);
    }
  );

  const [fetchStudents, isStudentsFetching, fetchingStudentsError] = useFetching(
    async () => {
      const students = await ClassroomService.getStudents(params.id);
      setStudents(students);
    }
  );

  useEffect(() => {
    fetchClassroom();
    fetchStudents();
  }, []);

  return (
    <>
      { fetchingClassroomError || fetchingStudentsError || classroom.detail || students.detail ? (
        navigate("/error", { replace: true })
      ) : (
        <Check
      ) }
    </>
  );
};

export default Check;