import React from "react";
import { Accordion, Card, CardBody, CardTitle } from "react-bootstrap";
import ErrorFileAlert from "../components/ClassroomEditForm/ErrorFileAlert";
import ClassroomEditDescriptionForm from "../components/ClassroomEditInfo/ClassroomEditDescriptionForm";
import ClassroomEditIcon from "../components/ClassroomEditInfo/ClassroomEditIcon";
import ClassroomEditTitleForm from "../components/ClassroomEditInfo/ClassroomEditTitleForm";

const ClassroomEditInfo = (
  {
    errorFileMessage, setErrorFileMessage,
    icon, updatedClassroom,
    handleClassroomFileChange, handleClassroomDescriptionChange,
    handleClassroomTitleChange,
  }
) => {
  return (
    <>
      <ClassroomEditTitleForm updatedClassroom={ updatedClassroom }
                              handleClassroomTitleChange={ handleClassroomTitleChange }/>

      <Accordion className="border border-info rounded mt-3 mb-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Подробная информация об учебном классе</Accordion.Header>
          <Accordion.Body>
            { errorFileMessage && <ErrorFileAlert errorFileMessage={ errorFileMessage }
                                                  setErrorFileMessage={ setErrorFileMessage }/> }

            <Card className="p-2 flex-row">
              <ClassroomEditIcon
                icon={ icon }
                updatedClassroom={ updatedClassroom }
                handleClassroomFileChange={ handleClassroomFileChange }/>

              <CardBody className="p-1 ">
                <CardTitle className="mb-0">{ `Описание учебного класса "${ updatedClassroom.title }"` }</CardTitle>
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