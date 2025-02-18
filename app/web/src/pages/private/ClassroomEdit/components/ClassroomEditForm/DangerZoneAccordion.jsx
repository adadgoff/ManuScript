import React, { useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import ClassroomDeleteModal from "./ClassroomDeleteModal";
import ClassroomQuitModal from "./ClassroomQuitModal";
import ErrorQuitAlert from "./ErrorQuitAlert";

const DangerZoneAccordion = ({ classroom }) => {
  const [modalQuitShow, setModalQuitShow] = useState(false);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <>
      <ClassroomQuitModal classroom={ classroom }
                          show={ modalQuitShow }
                          onHide={ () => setModalQuitShow(false) }
                          setErrorMessage={ setErrorMessage }/>

      <ClassroomDeleteModal classroom={ classroom }
                            show={ modalDeleteShow }
                            onHide={ () => setModalDeleteShow(false) }/>

      <ErrorQuitAlert errorMessage={ errorMessage }
                      setErrorMessage={ setErrorMessage }
                      show={ errorMessage }/>

      <Accordion className="border border-danger rounded my-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span className="text-danger fw-medium">Опасная зона</span>
          </Accordion.Header>

          <Accordion.Body>
            <Button className="btn-danger w-100 mb-3"
                    onClick={ () => setModalQuitShow(true) }>
              Покинуть учебный класс
            </Button>

            <Button className="btn-danger w-100"
                    onClick={ () => setModalDeleteShow(true) }>
              Удалить учебный класс
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default DangerZoneAccordion;