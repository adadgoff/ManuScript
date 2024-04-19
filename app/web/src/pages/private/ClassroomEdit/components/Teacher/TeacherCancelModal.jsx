import React from "react";
import { Button, Modal } from "react-bootstrap";

const TeacherCancelModal = ({ sortedTeachers, updatedTeachers, setUpdatedTeachers, ...props }) => {
  const handleTeachersCancelBtn = (event) => {
    event.preventDefault();
    setUpdatedTeachers(sortedTeachers);
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
        <p>Вы действительно хотите сбросить все изменения в редактировании преподавателей?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={ props.onHide } className="btn-primary">
          Вернуться к редактированию
        </Button>

        <Button className="btn-danger" onClick={ handleTeachersCancelBtn }>
          Сбросить изменения
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TeacherCancelModal;