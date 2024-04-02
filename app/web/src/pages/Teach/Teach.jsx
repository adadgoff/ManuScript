import React, { useState } from "react";
import ClassroomList from "../../components/Classroom/ClassroomList";

const Teach = () => {
  const [classrooms, setClassrooms] = useState([])

  return (
    <ClassroomList title={ "Мои учебные классы, где я \"Преподаватель\"" } classrooms={ classrooms }/>
  );
};

export default Teach;