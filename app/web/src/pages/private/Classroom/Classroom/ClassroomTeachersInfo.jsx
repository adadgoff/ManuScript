import React, { useEffect, useState } from "react";
import { Accordion, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ClassroomService from "../../../../API/Classroom/ClassroomService";
import { USER_PREFIX } from "../../../../API/User/UserPrefix";
import Loader from "../../../../components/UI/Loader/Loader";
import { LOADING_TEXT } from "../../../../components/UI/Loader/LoaderConstants";
import { useFetching } from "../../../../hooks/useFetching";

const ClassroomTeachersInfo = ({ classroom }) => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState({});
  const [fetchTeachers, isFetchingLoading, fetchingError] = useFetching(
    async () => {
      const teachers = await ClassroomService.getTeachers(classroom.id);
      setTeachers(teachers);
    }
  );

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <Accordion className="border border-primary rounded mt-3">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Подробная информация о преподавателях</Accordion.Header>
        <Accordion.Body className="p-2">
          { fetchingError || teachers.detail ? (
            navigate("/error", { replace: true })
          ) : isFetchingLoading ? (
            <Loader title={ LOADING_TEXT }/>
          ) : (
            <Table responsive>
              <thead>
              <tr>
                <th>№</th>
                <th>Имя пользователя</th>
                <th>Электронная почта</th>
              </tr>
              </thead>

              <tbody>
              { teachers.map((teacher, teacherIndex) =>
                <tr>
                  <td>{ teacherIndex + 1 }</td>
                  <td>
                    <Link to={ `/${ USER_PREFIX }/${ teacher.uuid }` } target="_blank">
                      { teacher.username }
                    </Link>
                  </td>

                  <td>
                    <Link to={ `/${ USER_PREFIX }/${ teacher.uuid }` } target="_blank">
                      { teacher.email }
                    </Link>
                  </td>
                </tr>
              ) }
              </tbody>
            </Table>
          ) }
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ClassroomTeachersInfo;