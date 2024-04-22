import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ClassroomService from "../../../../../API/Classroom/ClassroomService";
import Loader from "../../../../../components/UI/Loader/Loader";
import { LOADING_TEXT } from "../../../../../components/UI/Loader/LoaderConstants";

const ClassroomQuitModal = ({ classroom, setErrorMessage, ...props }) => {
  const navigate = useNavigate();
  const [isQuiting, setIsQuiting] = useState(false);

  const handleClassroomQuitBtn = async (event) => {
    event.preventDefault();

    try {
      setIsQuiting(true);
      const response = await ClassroomService.leaveClassroom(classroom.id);
      if (response.detail) {
        setErrorMessage(response.detail);
        props.onHide();
        return;
      }
      navigate("/learn", { replace: true });
    } catch (error) {
      console.log("Error quiting classroom", error);
    } finally {
      setIsQuiting(false);
    }
  }

  return (
    <>
      {
        isQuiting ? (
          <Loader title={ LOADING_TEXT }/>
        ) : (
          <Modal { ...props }
                 size="lg"
                 aria-labelledby="contained-modal-title-vcenter"
                 centered>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Внимание! Вы нажали на кнопку <i><b>"Покинуть учебный класс"</b></i>!
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="mb-0 pb-0">
              <p>Вы действительно хотите покинуть учебный класс <b>"{ classroom.title }"</b>?</p>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={ props.onHide } className="btn-primary">
                Я случайно...
              </Button>
              <Button className="btn-danger" onClick={ handleClassroomQuitBtn }>
                Покинуть
              </Button>
            </Modal.Footer>
          </Modal>
        )
      }
    </>
  );
};

export default ClassroomQuitModal;