import React, { useEffect, useState } from "react";
import ClassroomService from "../../../API/ClassroomService";
import ClassroomList from "../../../components/Classroom/ClassroomList";
import { useFetching } from "../../../hooks/useFetching";
import { LEARN_TITLE } from "./consts";

const Learn = () => {
  const [classrooms, setClassrooms] = useState([]);

  const [fetchClassrooms, isFetchingLoading, fetchingError] = useFetching(async () => {
    const studentClassrooms = await ClassroomService.getStudentClassrooms();
    setClassrooms(studentClassrooms);
  });

  useEffect(() => {
    fetchClassrooms();
  }, [])

  return (
    <ClassroomList
      title={ LEARN_TITLE }
      classrooms={ classrooms }
      isLoading={ isFetchingLoading }
    />
  );
};

export default Learn;