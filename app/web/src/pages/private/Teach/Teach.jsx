import React, { useEffect, useState } from "react";
import ClassroomService from "../../../API/Classroom/ClassroomService";
import { useFetching } from "../../../hooks/useFetching";
import { TEACH_TITLE } from "./constants";
import ClassroomList from "./TeacherClassroom/ClassroomList";

const Teach = () => {
  const [classrooms, setClassrooms] = useState([]);

  const [fetchClassrooms, isFetchingLoading, fetchingError] = useFetching(
    async () => {
      const teacherClassrooms = await ClassroomService.getTeacherClassrooms();
      setClassrooms(teacherClassrooms);
    }
  );

  useEffect(() => {
    fetchClassrooms();
  }, [])

  return (
    <ClassroomList
      title={ TEACH_TITLE }
      classrooms={ classrooms }
      isLoading={ isFetchingLoading }
    />
  );
};

export default Teach;