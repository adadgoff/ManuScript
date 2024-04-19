import React from "react";
import { Accordion, Button, Table } from "react-bootstrap";
import Loader from "../../../../../components/UI/Loader/Loader";
import { COPYING_TEXT, SORTING_TEXT } from "../../../../../components/UI/Loader/LoaderConstants";
import { useUpdatedStudents } from "../../../../../hooks/Student/useStudent";
import StudentAddForm from "./StudentAddForm";
import StudentSaveCancelMenu from "./StudentSaveCancelMenu";

const StudentAccordion = ({ classroom, students, setStudents }) => {
  const [updatedStudents, sortedStudents, isStudentsCopying, isSorting, setUpdatedStudents] = useUpdatedStudents(students);

  const handleStudentDelete = (deletingStudent) => {
    setUpdatedStudents(updatedStudents.filter(student => student.uuid !== deletingStudent.uuid));
  }

  return (
    <>
      {
        isSorting || isStudentsCopying ? (
          <Loader title={
            (isSorting && SORTING_TEXT) ||
            (isStudentsCopying && COPYING_TEXT) }/>
        ) : (
          <Accordion className="border border-success rounded mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Редактировать учащихся
              </Accordion.Header>

              <Accordion.Body>
                <Table responsive className="mb-2">
                  <thead>
                  <tr>
                    <th>№</th>
                    <th>Идентификационный номер</th>
                    <th>Имя пользователя</th>
                    <th>Электронная почта</th>
                    <th>Удалить учащегося</th>
                  </tr>
                  </thead>
                  <tbody>
                  { updatedStudents.map((updatedStudent, index) => (
                    <tr key={ updatedStudent.uuid }>
                      <td>{ index + 1 }</td>
                      <td>{ updatedStudent.uuid }</td>
                      <td>{ updatedStudent.username }</td>
                      <td>{ updatedStudent.email }</td>
                      <td>
                        <Button variant="outline-danger"
                                onClick={ () => handleStudentDelete(updatedStudent) }
                                children="🗑️"/>
                      </td>
                    </tr>
                  )) }
                  </tbody>
                </Table>

                <StudentAddForm classroom={ classroom }
                                updatedStudents={ updatedStudents }
                                setStudents={ setStudents }/>

                <StudentSaveCancelMenu classroom={ classroom }
                                       sortedStudents={ sortedStudents }
                                       setStudents={ setStudents }
                                       updatedStudents={ updatedStudents }
                                       setUpdatedStudents={ setUpdatedStudents }/>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ) }
    </>
  );
};

export default StudentAccordion;