import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ClassroomService from "../../../../../../API/Classroom/ClassroomService";
import Loader from "../../../../../../components/UI/Loader/Loader";
import { DELETING_TEXT, SORTING_TEXT } from "../../../../../../components/UI/Loader/LoaderConstants";

const ClassroomDeleteModal = (props) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteBtn = async (event) => {
    event.preventDefault();

    try {
      setIsDeleting(true);
      const response = await ClassroomService.deleteClassroom(props.classroom.id);
    } catch (error) {
      console.log("Error deleting classroom", error);
    } finally {
      setIsDeleting(false);
      navigate("/teach", { replace: true });
    }
  };

  return (
    <>
      {
        isDeleting ? (
          <Loader title={ DELETING_TEXT }/>
        ) : (
          <Modal { ...props }
                 size="lg"
                 aria-labelledby="contained-modal-title-vcenter"
                 centered>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Внимание! Вы нажали на кнопку "Удалить учебный класс"!
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="mb-0 pb-0">
              <p>{ `Вы действительно хотите удалить учебный класс "${ props.classroom.title }"?` }</p>
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
        )
      }
    </>
  );
};

export default ClassroomDeleteModal;