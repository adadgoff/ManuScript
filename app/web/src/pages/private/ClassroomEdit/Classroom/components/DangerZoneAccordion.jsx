import React from "react";
import { Accordion, Button } from "react-bootstrap";

const DangerZoneAccordion = () => {
  return (
    <Accordion className="border border-danger rounded my-4">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <span className="text-danger fw-medium">Опасная зона</span>
        </Accordion.Header>

        <Accordion.Body>
          <Button className="btn-danger w-100">
            Удалить учебный класс
          </Button>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default DangerZoneAccordion;