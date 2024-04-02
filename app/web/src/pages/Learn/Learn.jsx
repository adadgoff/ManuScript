import React, { useEffect, useState } from "react";
import ClassroomService from "../../API/ClassroomService";
import ClassroomList from "../../components/Classroom/ClassroomList";

const Learn = () => {
  const [classrooms, setClassrooms] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await ClassroomService.getStudentClassrooms();
        console.log(response)
        setClassrooms(response.data);
      } catch (error) {
        console.log("Error fetching classrooms:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <ClassroomList title={ "Мои учебные классы, где я \"Учащийся\"" } classrooms={ classrooms }/>
  );
};

export default Learn;