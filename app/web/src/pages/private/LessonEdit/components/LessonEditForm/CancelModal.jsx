import React from "react";
import { Button, Modal } from "react-bootstrap";

const CancelModal = ({ prevStateLesson, updatedLesson, setUpdatedLesson, ...props }) => {
  const handleLessonCancelBtn = (event) => {
    event.preventDefault();

    const prevStateSteps = prevStateLesson.steps.map(step => {
      const updatedStep = updatedLesson.steps.find(s => s.id === step.id);
      updatedStep.editorRef.current.setContent(step.text);
      return { ...step, editorRef: updatedStep.editorRef };
    })

    setUpdatedLesson({ ...updatedLesson, title: prevStateLesson.title, steps: prevStateSteps });
    props.onHide();
  };

  return (
    <Modal { ...props }
           size="lg"
           aria-labelledby="contained-modal-title-vcenter"
           centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Внимание! Вы нажали на кнопку <i><b>"Сбросить изменения"</b></i>!
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="mb-0 pb-0">
        <p>Вы действительно хотите сбросить все изменения в уроке?🤔</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={ props.onHide } className="btn-primary">
          Вернуться к редактированию
        </Button>

        <Button className="btn-danger" onClick={ handleLessonCancelBtn }>
          Сбросить изменения
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CancelModal;