import React, { useState } from "react";
import { Container, FloatingLabel, Form } from "react-bootstrap";
import { useSortedSearchedClassrooms } from "../../hooks/Classroom/useClassrooms";
import ClassroomItem from "./ClassroomItem";

const ClassroomList = ({ title, classrooms }) => {
  const [search, setSearch] = useState("")

  const sortedSearchedClassrooms = useSortedSearchedClassrooms(classrooms, search);

  return (
    <Container className="my-3">
      <FloatingLabel controlId="floatingInput" label="Название учебного класса" className="mb-3">
        <Form.Control type="text" placeholder="" onChange={ (event) => setSearch(event.target.value) }/>
      </FloatingLabel>

      <div
        className="text-bg-info text-center text-white rounded p-3 mb-3 fs-4 fw-medium">
        { title }
      </div>

      {
        classrooms.length !== 0
          ?
          sortedSearchedClassrooms.map(classroom =>
            <ClassroomItem
              // onClick={ }
              title={ classroom.title }
              description={ classroom.description }
              icon={ classroom.icon }
              key={ classroom.id }/>)
          :
          <h2 className="text-center">Тут пока что пусто...</h2>
      }
    </Container>
  );
};

export default ClassroomList;