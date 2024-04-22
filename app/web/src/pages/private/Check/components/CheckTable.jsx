import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { STEP_PREFIX } from "../../../../API/Step/StepPrefix";
import { USER_PREFIX } from "../../../../API/User/UserPrefix";
import CheckTableData from "./CheckTableData";

const CheckTable = ({ lesson, students, lessonTasks, classroom }) => {
  return (
    <Table responsive>
      <thead>
      <tr>
        <th>№</th>
        <th>Имя пользователя</th>
        <th>Электронная почта</th>
        {
          lessonTasks[lesson.id].steps.map((task, taskIndex) =>
            <th title="Посмотреть задание">
              <Link to={ `/${ STEP_PREFIX }/${ task.id }` } target="_blank">
                { `#${ taskIndex + 1 }` }
              </Link>
            </th>
          )
        }
      </tr>
      </thead>

      <tbody>
      { students.map((student, studentIndex) =>
        <tr>
          <td>{ studentIndex + 1 }</td>
          <td>
            <Link to={ `/${ USER_PREFIX }/${ student.uuid }` } target="_blank">
              { student.username }
            </Link>
          </td>

          <td>
            <Link to={ `/${ USER_PREFIX }/${ student.uuid }` } target="_blank">
              { student.email }
            </Link>
          </td>

          { lessonTasks[lesson.id].steps.map((task, taskIndex) =>
            <CheckTableData task={ task }
                            student={ student }
                            classroom={ classroom }/>
          ) }
        </tr>
      ) }
      </tbody>
    </Table>
  );
};

export default CheckTable;