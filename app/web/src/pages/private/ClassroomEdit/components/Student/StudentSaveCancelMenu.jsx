import React, { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import ClassroomService from "../../../../../API/Classroom/ClassroomService";
import StudentCancelModal from "./StudentCancelModal";
import StudentSavingModal from "./StudentSavingModal";

const StudentSaveCancelMenu = ({ classroom, sortedStudents, setStudents, updatedStudents, setUpdatedStudents }) => {
  const [saveModalShow, setSaveModalShow] = useState(false);
  const [cancelModalShow, setCancelModalShow] = useState(false);

  const handleStudentsSaveBtn = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      setSaveModalShow(true);
      const response = await ClassroomService.updateStudents(classroom.id, updatedStudents);
      setStudents(response);
    } catch (error) {
      console.log("Error updating students", error);
    } finally {
      setSaveModalShow(false);
    }
  };

  return (
    <>
      <StudentSavingModal show={ saveModalShow }/>

      <StudentCancelModal show={ cancelModalShow }
                          onHide={ () => setCancelModalShow(false) }
                          sortedStudents={ sortedStudents }
                          updatedStudents={ updatedStudents }
                          setUpdatedStudents={ setUpdatedStudents }/>

      <Stack direction="vertical" className="p-0 my-1 mt-4">

        <Button className="btn-success w-100 fw-medium mb-2"
                children={ "Сохранить учеников" }
                disabled={ JSON.stringify(sortedStudents) === JSON.stringify(updatedStudents) }
                onClick={ handleStudentsSaveBtn }/>

        <Button className="btn-danger w-100 fw-medium mt-2"
                children={ "Сбросить изменения учеников" }
                disabled={ JSON.stringify(sortedStudents) === JSON.stringify(updatedStudents) }
                onClick={ () => setCancelModalShow(true) }/>

      </Stack>
    </>
  );
};

export default StudentSaveCancelMenu;