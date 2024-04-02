import React, { useEffect, useState } from "react";
import ClassroomService from "../../API/ClassroomService";
import ClassroomList from "../../components/Classroom/ClassroomList";

const Learn = () => {
  const [classrooms, setClassrooms] = useState([])

  useEffect(async () => {
    console.log(await ClassroomService.getStudentClassrooms());
  }, []);

  return (
    <ClassroomList title={ "Мои учебные классы, где я \"Учащийся\"" } classrooms={ classrooms }/>
  );
};

export default Learn;