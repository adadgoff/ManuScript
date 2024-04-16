import React, { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import CancelModal from "./CancelModal";

const SaveCancelMenu = ({ prevStateLesson, updatedLesson, setUpdatedLesson }) => {
  const [cancelModalShow, setCancelModalShow] = useState(false);

  return (
    <>
      <CancelModal
        show={ cancelModalShow }
        onHide={ () => setCancelModalShow(false) }
        prevStateLesson={ prevStateLesson }
        updatedLesson={ updatedLesson }
        setUpdatedLesson={ setUpdatedLesson }/>

      <Stack
        direction="horizontal" gap={ 3 }
        className="border border-dark-subtle border-3 rounded p-3 my-4">

        <Button
          variant="outline-success"
          className="w-100 fw-medium"
          children={ "Сохранить" }
          type="submit"/>

        <div className="border border-dark vr"/>

        <Button
          variant="outline-danger"
          className="w-100 fw-medium"
          children={ "Сбросить изменения" }
          onClick={ () => setCancelModalShow(true) }/>

      </Stack>
    </>
  );
};

export default SaveCancelMenu;