import React, { useEffect, useState } from "react";
import ClassroomService from "../../../API/Classroom/ClassroomService";
import { useFetching } from "../../../hooks/useFetching";
import { LEARN_TITLE } from "./constants";
import ClassroomList from "./StudentClassroom/ClassroomList";

const Learn = () => {
  const [classrooms, setClassrooms] = useState([]);

  const [fetchClassrooms, isFetchingLoading, fetchingError] = useFetching(
    async () => {
      const studentClassrooms = await ClassroomService.getStudentClassrooms();
      setClassrooms(studentClassrooms);
    }
  );

  useEffect(() => {
    fetchClassrooms();
  }, []);

  return (
    <ClassroomList
      title={ LEARN_TITLE }
      classrooms={ classrooms }
      isLoading={ isFetchingLoading }
      fetchClassrooms={fetchClassrooms}
    />
  );
};

export default Learn;