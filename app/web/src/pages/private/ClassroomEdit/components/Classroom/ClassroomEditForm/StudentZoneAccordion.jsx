import React from "react";
import { Accordion, Button } from "react-bootstrap";

const StudentZoneAccordion = () => {
  return (
    <Accordion className="border border-success rounded my-4">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <span className="fw-medium">Редактировать учеников</span>
        </Accordion.Header>

        <Accordion.Body>
          <Button className="btn-success w-100">
            Добавить учеников
          </Button>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default StudentZoneAccordion;