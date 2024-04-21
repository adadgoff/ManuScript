import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClassroomService from "../../../API/Classroom/ClassroomService";
import Loader from "../../../components/UI/Loader/Loader";
import { LOADING_TEXT } from "../../../components/UI/Loader/LoaderConstants";
import { useFetching } from "../../../hooks/useFetching";
import CheckPage from "./components/CheckPage";

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
      students.sort((a, b) => {
        if (a.username !== b.username) {
          return a.username.localeCompare(b.username);
        } else {
          return a.email.localeCompare(b.email);
        }
      });
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
      ) : isClassroomFetchingLoading || isStudentsFetching ? (
        <Loader title={ LOADING_TEXT }/>
      ) : (
        <CheckPage classroom={ classroom }
                   students={ students }/>
      ) }
    </>
  );
};

export default Check;