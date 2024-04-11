import React from "react";
import { Accordion, Card, CardBody, CardTitle } from "react-bootstrap";
import ErrorFileAlert from "../components/Classroom/ClassroomEditForm/ErrorFileAlert";
import ClassroomEditDescriptionForm from "../components/Classroom/ClassroomEditInfo/ClassroomEditDescriptionForm";
import ClassroomEditIcon from "../components/Classroom/ClassroomEditInfo/ClassroomEditIcon";
import ClassroomEditTitleForm from "../components/Classroom/ClassroomEditInfo/ClassroomEditTitleForm";

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
      <ClassroomEditTitleForm updatedClassroom={ updatedClassroom }
                              handleClassroomTitleChange={ handleClassroomTitleChange }/>

      <Accordion className="border border-info rounded mt-3 mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Подробная информация об учебном классе</Accordion.Header>
          <Accordion.Body>
            { errorFileMessage && <ErrorFileAlert errorFileMessage={ errorFileMessage }
                                                  setErrorFileMessage={ setErrorFileMessage }/> }

            <Card className="p-2 flex-row">
              <ClassroomEditIcon
                selectedFile={ selectedFile }
                updatedClassroom={ updatedClassroom }
                handleClassroomFileChange={ handleClassroomFileChange }/>

              <CardBody className="p-1">
                <CardTitle>{ `Описание ${ updatedClassroom.title }` }</CardTitle>
                <ClassroomEditDescriptionForm
                  updatedClassroom={ updatedClassroom }
                  handleClassroomDescriptionChange={ handleClassroomDescriptionChange }/>
              </CardBody>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default ClassroomEditInfo;