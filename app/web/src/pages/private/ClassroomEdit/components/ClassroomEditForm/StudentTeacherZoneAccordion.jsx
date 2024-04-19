import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ClassroomService from "../../../../../API/Classroom/ClassroomService";
import Loader from "../../../../../components/UI/Loader/Loader";
import { LOADING_TEXT } from "../../../../../components/UI/Loader/LoaderConstants";
import { useFetching } from "../../../../../hooks/useFetching";
import StudentAccordion from "../Student/StudentAccordion";
import TeacherAccordion from "../Teacher/TeacherAccordion";

const StudentTeacherZoneAccordion = ({ classroom }) => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);  // For "GET" and "POST" requests.
  const [fetchStudents, isFetchingStudentsLoading, fetchingStudentsError] = useFetching(
    async () => {
      const students = await ClassroomService.getStudents(classroom.id);
      setStudents(students);
    }
  );

  const [teachers, setTeachers] = useState([]);  // For "GET" and "POST" requests.
  const [fetchTeachers, isFetchingTeachersLoading, fetchingTeachersError] = useFetching(
    async () => {
      const teachers = await ClassroomService.getTeachers(classroom.id);
      setTeachers(teachers);
    }
  );

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
  }, []);


  return (
    <Accordion className="border border-success rounded my-4">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <span className="fw-medium">Пользователи учебного класса</span>
        </Accordion.Header>
        <Accordion.Body>

          {
            fetchingStudentsError || students.detail ? (
              navigate("/error", { replace: true })
            ) : isFetchingStudentsLoading ? (
              <Loader title={ LOADING_TEXT }/>
            ) : (
              <StudentAccordion classroom={ classroom }
                                students={ students }
                                setStudents={ setStudents }/>
            )
          }

          {
            fetchingTeachersError || teachers.detail ? (
              navigate("/error", { replace: true })
            ) : isFetchingTeachersLoading ? (
              <Loader title={ LOADING_TEXT }/>
            ) : (
              <TeacherAccordion classroom={ classroom }
                                teachers={ teachers }
                                setTeachers={ setTeachers }/>
            )
          }

        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default StudentTeacherZoneAccordion;