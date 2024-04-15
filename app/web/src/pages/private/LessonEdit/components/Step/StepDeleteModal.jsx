import React from "react";
import { Button, Modal } from "react-bootstrap";

const StepDeleteModal = ({ step, updatedLesson, setUpdatedLesson, ...props }) => {
  const handleDeleteBtn = (event) => {
    event.preventDefault();

    const stepOrder = step.order;

    const updatedSteps = updatedLesson.steps.filter(step => step.order !== stepOrder);
    updatedSteps.map(step => {
      step.order -= step.order >= stepOrder;
      return step;
    });

    setUpdatedLesson(prevState => ({
      ...prevState,
      steps: updatedSteps,
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
          Внимание! Вы нажали на кнопку <i><b>"Удалить шаг"</b></i>!
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="mb-0 pb-0">
        <p>Вы действительно хотите удалить шаг <b>{ step.order }</b>?</p>
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

export default StepDeleteModal;