import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LessonService from "../../../../../API/Lesson/LessonService";
import Loader from "../../../../../components/UI/Loader/Loader";
import { DELETING_TEXT } from "../../../../../components/UI/Loader/LoaderConstants";

const LessonDeleteModal = ({ lesson, ...props }) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLessonDeleteBtn = async (event) => {
    event.preventDefault();

    try {
      setIsDeleting(true);
      const response = await LessonService.deleteLesson(lesson.id);
      navigate(`/classroom/${ response.module.classroom_id }/edit`);
    } catch (error) {
      console.log("Error deleting lesson", error);
    } finally {
      setIsDeleting(false);
    }
  }

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
                Внимание! Вы нажали на кнопку <i><b>"Удалить урок"</b></i>!
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="mb-0 pb-0">
              <p>Вы действительно хотите удалить урок?</p>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={ props.onHide } className="btn-primary">
                Я случайно...
              </Button>
              <Button className="btn-danger" onClick={ handleLessonDeleteBtn }>
                Удалить
              </Button>
            </Modal.Footer>
          </Modal>
        )
      }
    </>
  );
};

export default LessonDeleteModal;