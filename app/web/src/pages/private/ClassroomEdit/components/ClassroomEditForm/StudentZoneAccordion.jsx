import React from "react";
import { Accordion } from "react-bootstrap";
import StudentAccordion from "../Student/StudentAccordion";
import TeacherAccordion from "../Teacher/TeacherAccordion";

const StudentZoneAccordion = ({ classroom }) => {
  return (
    <Accordion className="border border-success rounded my-4">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <span className="fw-medium">Пользователи учебного класса</span>
        </Accordion.Header>
        <Accordion.Body>

          <StudentAccordion/>
          <TeacherAccordion/>

        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default StudentZoneAccordion;