import React from "react";
import { Accordion, Container } from "react-bootstrap";
import Loader from "../../../../components/UI/Loader/Loader";
import { LOADING_TEXT, SORTING_TEXT } from "../../../../components/UI/Loader/LoaderConstants";
import { useSortedClassroom } from "../../../../hooks/Classroom/useClassroom";
import { TITLE_CLASS_NAME } from "../../../../styles/Classroom/ClassroomStyles";
import Modules from "../Module/Modules";
import ClassroomItem from "./ClassroomItem";
import ClassroomTeachersInfo from "./ClassroomTeachersInfo";
import DangerZoneAccordion from "./DangerZoneAccordion";

const ClassroomForm = ({ ...props }) => {
  const [sortedClassroom, isSorting] = useSortedClassroom(props.classroom);

  return (
    <>
      { props.isLoading || isSorting ? (
        <Loader title={ props.isLoading ? LOADING_TEXT : SORTING_TEXT }/>
      ) : (
        <Container className="my-3">
          <h1 className={ TITLE_CLASS_NAME }>{ sortedClassroom.title }</h1>

          <Accordion className="border border-info rounded">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Подробная информация об учебном классе</Accordion.Header>
              <Accordion.Body>
                <ClassroomItem classroom={ sortedClassroom }/>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <ClassroomTeachersInfo classroom={ props.classroom }/>

          <hr className="my-4"/>

          <h2 className="text-center">Программа учебного класса</h2>
          { sortedClassroom.modules && sortedClassroom.modules.length > 0 ? (
            <Modules modules={ sortedClassroom.modules }/>
          ) : (
            <h5 className="text-center bg-info-subtle border border-primary-subtle border-2 rounded p-3 mt-4">
              Модулей в учебном классе нет...
            </h5>
          ) }

          <hr className="my-4"/>

          <DangerZoneAccordion classroom={ sortedClassroom }/>
        </Container>
      ) }
    </>
  );

};

export default ClassroomForm;