import React, { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import ClassroomCancelModal from "./ClassroomCancelModal";

const ClassroomSaveCancelMenu = ({
                                   sortedClassroom,
                                   updatedClassroom,
                                   setUpdatedClassroom,
                                   selectedFile,
                                   setSelectedFile,
                                   setIcon
                                 }) => {
  const [cancelModalShow, setCancelModalShow] = useState(false);

  return (
    <>
      <ClassroomCancelModal show={ cancelModalShow }
                            onHide={ () => setCancelModalShow(false) }
                            sortedClassroom={ sortedClassroom }
                            updatedClassroom={ updatedClassroom }
                            setUpdatedClassroom={ setUpdatedClassroom }
                            setIcon={ setIcon }
                            setSelectedFile={ setSelectedFile }/>

      <Stack direction="horizontal" gap={ 3 }
             className="border border-dark-subtle border-3 rounded p-3 my-4">

        <Button variant="outline-success"
                className="w-100 fw-medium"
                children={ "Сохранить учебный класс" }
                disabled={ !selectedFile && JSON.stringify(sortedClassroom) === JSON.stringify(updatedClassroom) }
                type="submit"/>

        <div className="border border-dark vr"/>

        <Button variant="outline-danger"
                className="w-100 fw-medium"
                children={ "Сбросить изменения учебного класса" }
                disabled={ !selectedFile && JSON.stringify(sortedClassroom) === JSON.stringify(updatedClassroom) }
                onClick={ () => setCancelModalShow(true) }/>

      </Stack>
    </>
  );
};

export default ClassroomSaveCancelMenu;