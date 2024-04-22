import React, { useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import ClassroomQuitModal from "../../ClassroomEdit/components/ClassroomEditForm/ClassroomQuitModal";
import ErrorQuitAlert from "../../ClassroomEdit/components/ClassroomEditForm/ErrorQuitAlert";

const DangerZoneAccordion = ({ classroom }) => {
  const [modalQuitShow, setModalQuitShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <>
      <ClassroomQuitModal classroom={ classroom }
                          show={ modalQuitShow }
                          onHide={ () => setModalQuitShow(false) }
                          setErrorMessage={ setErrorMessage }/>

      <ErrorQuitAlert errorMessage={ errorMessage }
                      setErrorMessage={ setErrorMessage }
                      show={ errorMessage }/>

      <Accordion className="border border-danger rounded my-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span className="text-danger fw-medium">Опасная зона</span>
          </Accordion.Header>

          <Accordion.Body>
            <Button className="btn-danger w-100"
                    onClick={ () => setModalQuitShow(true) }>
              Покинуть учебный класс
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default DangerZoneAccordion;