import React, { useState } from "react";
import { Container } from "react-bootstrap";
import ClassroomItem from "../../components/Classroom/ClassroomList";

const Learn = () => {
  const [classrooms, setClassrooms] = useState([
    { id: 1, title: "Title 1", description: "Description 1", icon: { uuid: "3342be25-236f-4594-a82d-2247a4e054c8" } },
    {
      id: 2,
      title: "Title 2Title 2Title 2Title 2Title 2",
      description: "Description 2Description 2Description 2Description 2Description 2Description 2Description 2Description 2Description 2Description 2Description 2Description 2Description 2Description 2",
      icon: { uuid: "3342be25-236f-4594-a82d-2247a4e054c8" }
    },
  ])

  const testClick = () => {
    console.log("Класс был нажат!");
    // Здесь вы можете выполнить дополнительные действия при нажатии на класс
  };

  return (
    <Container className="my-3">
      <div
        className="text-bg-info text-center text-white rounded p-3 mb-3 fs-4 fw-medium">
        Мои учебные классы, где я "Учащийся"
      </div>

      { classrooms.map(classroom =>
        <ClassroomItem onClick={ testClick }
                       title={ classroom.title }
                       description={ classroom.description }
                       icon={ classroom.icon }
                       key={ classroom.id }
        />
      ) }

    </Container>
  );
};

export default Learn;