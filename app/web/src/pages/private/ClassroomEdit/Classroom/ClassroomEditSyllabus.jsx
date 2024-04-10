import React from "react";
import { Accordion, Button } from "react-bootstrap";
import Modules from "../Module/Modules";

const ClassroomEditSyllabus = ({ updatedClassroom, setUpdatedClassroom }) => {
  return (
    <Accordion className="border border-warning border-3 rounded-3 my-4">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <span className="fw-medium">Программа учебного класса</span>
        </Accordion.Header>

        <Accordion.Body className="p-2">
          <Modules modules={ updatedClassroom.modules }
                   updatedClassroom={updatedClassroom}
                   setUpdatedClassroom={ setUpdatedClassroom }/>
        </Accordion.Body>
        <Accordion.Body>
          <div className="my-4 border border-warning border"/>
          <Button
            className="btn-success w-100 mb-2"
            children={ "Создать модуль" }/>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

  );
};

export default ClassroomEditSyllabus;