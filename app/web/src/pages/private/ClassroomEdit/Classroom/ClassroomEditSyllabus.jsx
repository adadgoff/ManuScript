import React, { useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import Modules from "../components/ClassroomEditSyllabus/Module/Modules";
import ModuleCreateModal from "../components/Module/ModuleCreateModal";

const ClassroomEditSyllabus = ({ updatedClassroom, setUpdatedClassroom }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <ModuleCreateModal
        show={ modalShow }
        onHide={ () => setModalShow(false) }
        updatedClassroom={ updatedClassroom }
        setUpdatedClassroom={ setUpdatedClassroom }/>

      <Accordion className="border border-warning border-3 rounded-3 my-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span className="fw-medium">Программа учебного класса</span>
          </Accordion.Header>

          <Accordion.Body className="p-0">
            <div className="my-4 border border-warning border-2"/>

            <Modules modules={ updatedClassroom.modules }
                     updatedClassroom={ updatedClassroom }
                     setUpdatedClassroom={ setUpdatedClassroom }/>

            <div className="mt-4 border border-warning border-2"/>
          </Accordion.Body>

          <Accordion.Body>
            <Button
              onClick={ () => setModalShow(true) }
              className="btn-success w-100"
              children={ "Создать модуль" }/>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default ClassroomEditSyllabus;