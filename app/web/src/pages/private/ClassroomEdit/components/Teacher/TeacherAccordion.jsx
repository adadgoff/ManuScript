import React from "react";
import { Accordion } from "react-bootstrap";

const TeacherAccordion = () => {


  return (
    <Accordion className="border border-success rounded">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          Редактировать преподавателей
        </Accordion.Header>

        <Accordion.Body>

        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default TeacherAccordion;