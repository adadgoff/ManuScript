import React from "react";
import { Accordion, Button } from "react-bootstrap";
import ClassroomDeleteModal from "./ClassroomDeleteModal";

const DangerZoneAccordion = ({ classroom }) => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <ClassroomDeleteModal
        classroom={ classroom }
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
              Удалить учебный класс
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default DangerZoneAccordion;