import { cloneDeep } from "lodash";
import React from "react";
import { Button, Modal } from "react-bootstrap";

const CancelModal = ({ sortedClassroom, setUpdatedClassroom, setSelectedFile, ...props }) => {
  const handleCancelBtn = async (event) => {
    event.preventDefault();

    // const sortedCopy = { ...sortedClassroom };
    //
    // sortedClassroom.modules && sortedClassroom.modules.sort((a, b) => a.order - b.order);
    //
    // sortedClassroom.modules && sortedClassroom.modules.forEach((module) => {
    //   module.lessons && module.lessons.sort((a, b) => a.order - b.order);
    // });

    setUpdatedClassroom(cloneDeep(sortedClassroom));
    setSelectedFile(null);

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

        <Button className="btn-danger" onClick={ handleCancelBtn }>
          Сбросить изменения
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CancelModal;