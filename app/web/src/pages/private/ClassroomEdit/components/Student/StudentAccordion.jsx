import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import ClassroomService from "../../../../../API/Classroom/ClassroomService";
import { useFetching } from "../../../../../hooks/useFetching";

const StudentAccordion = ({ classroom }) => {
  const [students, setStudents] = useState([]);

  const [fetchStudents, isFetchingLoading, fetchingError] = useFetching(
    async () => {
      const students = await ClassroomService.getStudents(classroom.id);
      setStudents(students);
    }
  )

  return (
    <Accordion className="border border-success rounded">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          Редактировать учащихся
        </Accordion.Header>

        <Accordion.Body>

        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default StudentAccordion;