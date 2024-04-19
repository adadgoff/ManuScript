import { cloneDeep } from "lodash";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { IMAGE_PATH } from "../../../../../API/Paths";

const ClassroomCancelModal = ({ sortedClassroom, setUpdatedClassroom, setSelectedFile, setIcon, ...props }) => {
  const handleClassroomCancelBtn = (event) => {
    event.preventDefault();

    setUpdatedClassroom(cloneDeep(sortedClassroom));
    setSelectedFile(null);
    setIcon(sortedClassroom.icon ? `${ IMAGE_PATH }/${ sortedClassroom.icon.uuid }` : null);

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
        <p>Вы действительно хотите сбросить все изменения в учебном классе?🤔</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={ props.onHide } className="btn-primary">
          Вернуться к редактированию
        </Button>

        <Button className="btn-danger" onClick={ handleClassroomCancelBtn }>
          Сбросить изменения
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClassroomCancelModal;