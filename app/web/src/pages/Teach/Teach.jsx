import React, { useEffect, useState } from "react";
import ClassroomService from "../../API/ClassroomService";
import ClassroomList from "../../components/Classroom/ClassroomList";

const Teach = () => {
  const [classrooms, setClassrooms] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await ClassroomService.getTeacherClassrooms();
        setClassrooms(data);
      } catch (error) {
        console.log("Error fetching classrooms:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <ClassroomList title={ "Мои учебные классы, где я \"Преподаватель\"" } classrooms={ classrooms }/>
  );
};

export default Teach;