import React, { useEffect, useState } from "react";
import ClassroomService from "../../../API/ClassroomService";
import ClassroomList from "../../../components/Classroom/ClassroomList";
import { useFetching } from "../../../hooks/useFetching";
import { TEACH_TITLE } from "./consts";

const Teach = () => {
  const [classrooms, setClassrooms] = useState([]);

  const [fetchClassrooms, isClassroomsLoading, classroomError] = useFetching(async () => {
    const teacherClassrooms = await ClassroomService.getTeacherClassrooms();
    setClassrooms(teacherClassrooms);
  });

  useEffect(() => {
    fetchClassrooms();
  }, [])

  return (
    <ClassroomList
      title={ TEACH_TITLE }
      classrooms={ classrooms }
      isLoading={ isClassroomsLoading }
    />
  );
};

export default Teach;