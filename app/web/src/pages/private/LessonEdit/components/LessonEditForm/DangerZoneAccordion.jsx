import React, { useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import LessonDeleteModal from "./LessonDeleteModal";

const DangerZoneAccordion = ({ lesson }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <LessonDeleteModal
        lesson={ lesson }
        show={ modalShow }
        onHide={ () => setModalShow(false) }/>

      <Accordion className="border border-danger rounded my-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span className="text-danger fw-medium">Опасная зона</span>
          </Accordion.Header>

          <Accordion.Body>
            <Button
              className="btn-danger w-100"
              onClick={ () => setModalShow(true) }>
              Удалить урок
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default DangerZoneAccordion;