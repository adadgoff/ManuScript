import React, { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import ClassroomService from "../../../../../API/Classroom/ClassroomService";
import TeacherCancelModal from "./TeacherCancelModal";
import TeacherSavingModal from "./TeacherSavingModal";
import TeacherUpdateAlert from "./TeacherUpdateAlert";

const TeacherSaveCancelMenu = ({ classroom, sortedTeachers, setTeachers, updatedTeachers, setUpdatedTeachers }) => {
  const [saveModalShow, setSaveModalShow] = useState(false);
  const [cancelModalShow, setCancelModalShow] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleTeachersSaveBtn = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      setSaveModalShow(true);
      const response = await ClassroomService.updateTeachers(classroom.id, updatedTeachers);
      if (response.detail) {
        setErrorMessage(response.detail);
        setUpdatedTeachers(sortedTeachers);
        return;
      }
      setTeachers(response);
    } catch (error) {
      console.log("Error updating teachers", error);
    } finally {
      setSaveModalShow(false);
    }
  };

  return (
    <>
      <TeacherSavingModal show={ saveModalShow }/>

      <TeacherCancelModal show={ cancelModalShow }
                          onHide={ () => setCancelModalShow(false) }
                          sortedTeachers={ sortedTeachers }
                          updatedTeachers={ updatedTeachers }
                          setUpdatedTeachers={ setUpdatedTeachers }/>

      <TeacherUpdateAlert errorMessage={ errorMessage }
                          setErrorMessage={ setErrorMessage }
                          show={ errorMessage }/>

      <Stack direction="vertical" className="p-0 my-1 mt-4">

        <Button className="btn-success w-100 fw-medium mb-2"
                children={ "Сохранить преподавателей" }
                disabled={ JSON.stringify(sortedTeachers) === JSON.stringify(updatedTeachers) }
                onClick={ handleTeachersSaveBtn }/>

        <Button className="btn-danger w-100 fw-medium mt-2"
                children={ "Сбросить изменения преподавателей" }
                disabled={ JSON.stringify(sortedTeachers) === JSON.stringify(updatedTeachers) }
                onClick={ () => setCancelModalShow(true) }/>

      </Stack>
    </>
  );
};

export default TeacherSaveCancelMenu;