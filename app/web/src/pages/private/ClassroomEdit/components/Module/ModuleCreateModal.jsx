import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ModuleCreateDescriptionForm from "./ModuleCreateDescriptionForm";
import ModuleCreateTitleForm from "./ModuleCreateTitleForm";

const ModuleCreateModal = ({ updatedClassroom, setUpdatedClassroom, ...props }) => {
  const [validated, setValidated] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    if (form.checkValidity() === true) {
      const newModule = {
        title: title,
        description: description,
        order: (updatedClassroom.modules.length + 1),
        lessons: [],
      };
      const updatedModules = [...updatedClassroom.modules, newModule];
      setUpdatedClassroom({ ...updatedClassroom, modules: updatedModules });

      props.onHide();
    }
  }

  return (
    <Modal { ...props } size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Form noValidate validated={ validated } onSubmit={ handleSubmit }>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Форма создания модуля
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="mb-3">
            <ModuleCreateTitleForm title={ title } setTitle={ setTitle }/>
          </div>
          <div className="mb-2">
            <ModuleCreateDescriptionForm description={ description } setDescription={ setDescription }/>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ props.onHide }>Отменить</Button>
          <Button className="btn-success" type="submit">Создать модуль</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModuleCreateModal;