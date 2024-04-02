import React from "react";
import { Container } from "react-bootstrap";
import ClassroomItem from "./ClassroomItem";

const ClassroomList = (classrooms, title) => {
  const testClick = () => {
    console.log("Класс был нажат!");
    // Здесь вы можете выполнить дополнительные действия при нажатии на класс
  };

  return (
    <Container className="my-3">
      <div
        className="text-bg-info text-center text-white rounded p-3 mb-3 fs-4 fw-medium">
        { title }
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

export default ClassroomList;