import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModuleDeleteModal = ({ module, updatedClassroom, setUpdatedClassroom, ...props }) => {

  const handleDeleteBtn = async (event) => {
    event.preventDefault();

    const updatedModules = updatedClassroom.modules.filter(m => m.order !== module.order);
    updatedModules.map(m => {
      if (m.order >= module.order) {
        m.order -= 1;
      }
      return m;
    });

    setUpdatedClassroom(prevState => ({
      ...prevState,
      modules: updatedModules
    }));

    props.onHide();
  }

  return (
    <Modal { ...props }
           size="lg"
           aria-labelledby="contained-modal-title-vcenter"
           centered>
      <Modal.Header closeVariant>
        <Modal.Title id="contained-modal-title-vcenter">
          Внимание! Вы нажали на кнопку <i><b>"Удалить модуль"</b></i>!
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="mb-0 pb-0">
        <p>Вы действительно хотите удалить модуль <b>"{ module.title }"</b>?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={ props.onHide } className="btn-primary">
          Я случайно...
        </Button>
        <Button className="btn-danger" onClick={ handleDeleteBtn }>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModuleDeleteModal;