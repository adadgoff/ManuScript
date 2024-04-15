import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CLASSROOM_PREFIX } from "../../../../API/Classroom/ClassroomPrefix";
import ClassroomService from "../../../../API/Classroom/ClassroomService";
import Loader from "../../../../components/UI/Loader/Loader";
import { LOADING_TEXT } from "../../../../components/UI/Loader/LoaderConstants";
import ClassroomCreateDescriptionForm from "./ClassroomCreateDescriptionForm";
import ClassroomCreateTitleForm from "./ClassroomCreateTitleForm";

const ClassroomCreateModal = (props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    if (form.checkValidity() === true) {
      try {
        setIsLoading(true);
        const response = await ClassroomService.createClassroom(title, description);
        navigate(`/${CLASSROOM_PREFIX}/${response.id}/edit`);
      } catch (error) {
        console.log("Error creating classroom", error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      {
        isLoading ? (
          <Loader title={ LOADING_TEXT }/>
        ) : (
          <Modal { ...props } size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Form noValidate validated={ validated } onSubmit={ handleSubmit }>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Форма создания учебного класса
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="mb-3">
                  <ClassroomCreateTitleForm title={ title } setTitle={ setTitle }/>
                </div>
                <div className="mb-2">
                  <ClassroomCreateDescriptionForm description={ description } setDescription={ setDescription }/>
                </div>
              </Modal.Body>

              <Modal.Footer>
                <Button onClick={ props.onHide }>Отменить</Button>
                <Button className="btn-success" type="submit">Создать класс</Button>
              </Modal.Footer>
            </Form>
          </Modal>
        )
      }
    </>
  );
};

export default ClassroomCreateModal;