import React from "react";
import { Accordion, Card, CardBody, CardImg, CardTitle, Form } from "react-bootstrap";
import { IMAGE_PATH } from "../../../../API/Image/ImageConstants";
import {
  CLASSROOM_DEFAULT_IMAGE_UUID,
  CLASSROOM_MAX_DESCRIPTION_LENGTH,
  CLASSROOM_MAX_TITLE_LENGTH
} from "../../../../constants/Classroom/ClassroomConstants";
import ErrorFileAlert from "./components/ErrorFileAlert";

const ClassroomEditInfo = (
  {
    errorFileMessage, setErrorFileMessage,
    selectedFile, updatedClassroom,
    handleClassroomFileChange, handleClassroomDescriptionChange,
    handleClassroomTitleChange,
  }
) => {
  return (
    <>
      <Form.Text>{ `${ updatedClassroom.title.length } / ${ CLASSROOM_MAX_TITLE_LENGTH }` }</Form.Text>
      <Form.Control
        required
        type="text"
        size="lg"
        minLength={ 1 }
        maxLength={ CLASSROOM_MAX_TITLE_LENGTH }
        className="border border-info rounded"
        placeholder={ "Название учебного класса" }
        onChange={ handleClassroomTitleChange }
        value={ updatedClassroom.title }
      />
      <Form.Control.Feedback type="invalid" children={ "Название класса не должно быть пустым!" }/>


      <Accordion className="border border-info rounded mt-3 mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Подробная информация об учебном классе</Accordion.Header>
          <Accordion.Body>
            { errorFileMessage && <ErrorFileAlert errorFileMessage={ errorFileMessage }
                                                  setErrorFileMessage={ setErrorFileMessage }/> }

            <Card className="p-2 flex-row">
              <div className="d-flex align-items-center justify-content-center">
                <input type="file" id="fileInput" className="d-none" accept="image/*"
                       onChange={ handleClassroomFileChange }/>
                <label htmlFor="fileInput">
                  <CardImg
                    src={ selectedFile || `${ IMAGE_PATH }/${ updatedClassroom.icon ? updatedClassroom.icon.uuid : CLASSROOM_DEFAULT_IMAGE_UUID }` }
                    alt="Icon"
                    className="p-0 btn-light border border-info rounded"
                    style={ { height: "80px", width: "80px", alignContent: "center", cursor: "pointer" } }
                    onClick={ () => {
                    } }
                  />
                </label>
              </div>

              <CardBody className="p-1">
                <CardTitle>{ `Описание ${ updatedClassroom.title }` }</CardTitle>
                <Form.Text>{ `${ updatedClassroom.description.length } / ${ CLASSROOM_MAX_DESCRIPTION_LENGTH }` }</Form.Text>
                <Form.Control
                  required
                  type="text"
                  minLength={ 1 }
                  maxLength={ CLASSROOM_MAX_DESCRIPTION_LENGTH }
                  className="border border-info rounded"
                  placeholder={ "Описание учебного класса" }
                  onChange={ handleClassroomDescriptionChange }
                  value={ updatedClassroom.description }
                />
                <Form.Control.Feedback type="invalid" children={ "Описание класса не должно быть пустым!" }/>
              </CardBody>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default ClassroomEditInfo;