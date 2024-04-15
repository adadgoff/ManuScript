import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModuleDeleteModal = ({ module, updatedClassroom, setUpdatedClassroom, ...props }) => {
  const handleDeleteBtn = (event) => {
    event.preventDefault();

    const moduleOrder = module.order;

    const updatedModules = updatedClassroom.modules.filter(module => module.order !== moduleOrder);
    updatedModules.map(module => {
      module.order -= module.order >= moduleOrder;
      return module;
    });

    setUpdatedClassroom(prevState => ({
      ...prevState,
      modules: updatedModules,
    }));

    props.onHide();
  };

  return (
    <Modal { ...props }
           size="lg"
           aria-labelledby="contained-modal-title-vcenter"
           centered>
      <Modal.Header closeButton>
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