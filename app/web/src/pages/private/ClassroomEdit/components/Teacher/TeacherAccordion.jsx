import React from "react";
import { Accordion, Button, Table } from "react-bootstrap";
import Loader from "../../../../../components/UI/Loader/Loader";
import { COPYING_TEXT, SORTING_TEXT } from "../../../../../components/UI/Loader/LoaderConstants";
import { useUpdatedTeachers } from "../../../../../hooks/Teacher/useTeacher";
import TeacherAddForm from "./TeacherAddForm";
import TeacherSaveCancelMenu from "./TeacherSaveCancelMenu";

const TeacherAccordion = ({ classroom, teachers, setTeachers }) => {
  const [updatedTeachers, sortedTeachers, isTeachersCopying, isSorting, setUpdatedTeachers] = useUpdatedTeachers(teachers);

  const handleTeacherDelete = (deletingTeacher) => {
    setUpdatedTeachers(updatedTeachers.filter(teacher => teacher.uuid !== deletingTeacher.uuid));
  }

  return (
    <>
      {
        isSorting || isTeachersCopying ? (
          <Loader title={
            (isSorting && SORTING_TEXT) ||
            (isTeachersCopying && COPYING_TEXT) }/>
        ) : (
          <Accordion className="border border-success rounded mt-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Редактировать преподавателей
              </Accordion.Header>

              <Accordion.Body>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>№</th>
                    <th>Идентификационный номер</th>
                    <th>Имя пользователя</th>
                    <th>Электронная почта</th>
                    <th>Удалить преподавателя</th>
                  </tr>
                  </thead>
                  <tbody>
                  { updatedTeachers.map((updatedTeacher, index) => (
                    <tr key={ updatedTeacher.uuid }>
                      <td>{ index + 1 }</td>
                      <td>{ updatedTeacher.uuid }</td>
                      <td>{ updatedTeacher.username }</td>
                      <td>{ updatedTeacher.email }</td>
                      <td>
                        <Button variant="outline-danger"
                                onClick={ () => handleTeacherDelete(updatedTeacher) }
                                children="🗑️"
                                disabled={ updatedTeachers.length === 1 }
                                title={ updatedTeachers.length === 1 ? "Нельзя оставить учебный класс без преподавателя" : "" }/>
                      </td>
                    </tr>
                  )) }
                  </tbody>
                </Table>

                <TeacherAddForm classroom={ classroom }
                                updatedTeachers={ updatedTeachers }
                                setTeachers={ setTeachers }/>

                <TeacherSaveCancelMenu classroom={ classroom }
                                       sortedTeachers={ sortedTeachers }
                                       setTeachers={ setTeachers }
                                       updatedTeachers={ updatedTeachers }
                                       setUpdatedTeachers={ setUpdatedTeachers }/>

              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ) }
    </>
  );
};

export default TeacherAccordion;