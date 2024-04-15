import React, { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import CancelModal from "./CancelModal";

const SaveCancelMenu = ({ sortedClassroom, updatedClassroom, setUpdatedClassroom, selectedFile, setSelectedFile }) => {
  const [cancelModalShow, setCancelModalShow] = useState(false);

  return (
    <>
      <CancelModal
        show={ cancelModalShow }
        onHide={ () => setCancelModalShow(false) }
        sortedClassroom={ sortedClassroom }
        updatedClassroom={ updatedClassroom }
        setUpdatedClassroom={ setUpdatedClassroom }
        setSelectedFile={ setSelectedFile }/>

      <Stack
        direction="horizontal"
        gap={ 3 }
        className="border border-dark-subtle border-3 rounded p-3 my-4"
      >
        <Button
          variant="outline-success"
          className="w-100 fw-medium"
          children={ "Сохранить" }
          disabled={ !selectedFile && JSON.stringify(sortedClassroom) === JSON.stringify(updatedClassroom) }
          type="submit"
        />
        <div className="border border-dark vr"/>
        <Button
          variant="outline-danger"
          className="w-100 fw-medium"
          children={ "Сбросить изменения" }
          disabled={ !selectedFile && JSON.stringify(sortedClassroom) === JSON.stringify(updatedClassroom) }
          onClick={ () => setCancelModalShow(true) }
        />
      </Stack>
    </>
  );
};

export default SaveCancelMenu;