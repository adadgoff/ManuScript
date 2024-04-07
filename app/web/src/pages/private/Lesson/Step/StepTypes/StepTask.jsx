import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import ImageService from "../../../../../API/Image/ImageService";
import StepText from "../StepText";
import StepType from "../StepType";

const StepTask = ({ ...props }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [sizeError, setSizeError] = useState(false);

  const handlerFormSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile.size > 5 * 1024 * 1024) {
      setSizeError(true);
      return;
    }

    try {
      const response = await ImageService.uploadImage(selectedFile);
      console.log("Success uploading file", response);
    } catch (error) {
      console.log("Error uploading file", error)
    }
  }

  return (
    <Form onSubmit={ handlerFormSubmit }>
      <StepType step={ props.step }/>
      <StepText step={ props.step }/>

      {
        sizeError
          ?
          <Alert
            variant="danger"
            onClose={ () => setSizeError(false) }
            dismissible
            className="my-3"
          >
            <Alert.Heading>Слишком большой файл!</Alert.Heading>
            <p>
              Пожалуйста выберите файл с размером до 5 MB.
            </p>
          </Alert>
          : null
      }

      <Form.Group
        controlId="formFile"
        className="my-3 border border-info rounded p-3"
      >
        <Form.Label>Прикрепите файл (макс. 5 MB)</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={ event => {
            setSelectedFile(event.target.files[0]);
            setSizeError(false);
          } }
        />
        <Button
          type="submit"
          className="btn-success w-100 mt-3"
          children="Ответить"
          disabled={ selectedFile === null || sizeError === true }
        />
      </Form.Group>
    </Form>
  );
};

export default StepTask;