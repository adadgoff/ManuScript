import React from "react";
import { Button, Stack } from "react-bootstrap";

const SaveCancelMenu = ({ ...props }) => {
  return (
    <Stack
      direction="horizontal"
      gap={ 3 }
      className="border border-dark-subtle border-3 rounded p-3 my-4"
    >
      <Button
        variant="outline-success"
        className="w-100 fw-medium"
        children={ "Сохранить" }
        disabled={ !props.selectedFile && JSON.stringify(props.sortedClassroom) === JSON.stringify(props.updatedClassroom) }
        type="submit"
      />
      <div className="border border-dark vr"/>
      <Button
        variant="outline-danger"
        className="w-100 fw-medium"
        children={ "Сбросить изменения" }
        disabled={ !props.selectedFile && JSON.stringify(props.sortedClassroom) === JSON.stringify(props.updatedClassroom) }
        onClick={ () => {
          props.setUpdatedClassroom(props.sortedClassroom);
          props.setSelectedFile(null);
        } }
      />
    </Stack>
  );
};

export default SaveCancelMenu;