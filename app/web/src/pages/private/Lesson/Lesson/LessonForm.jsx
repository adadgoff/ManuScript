import React from "react";
import { Container } from "react-bootstrap";
import { LOADING_TEXT } from "../../../components/UI/Loader/consts";
import Loader from "../../../components/UI/Loader/Loader";
import { SORTING_TEXT } from "../../../constants/classrooms";
import { useSortedLesson } from "../../../hooks/LessonHooks/useLesson";
import { TITLE_CLASS_NAME } from "../../../styles/Classroom/ClassroomStyles";
import Navigation from "./Navigation";

const LessonForm = ({ ...props }) => {
  const [sortedLesson, isSorting] = useSortedLesson(props.lesson);

  console.log(sortedLesson);

  return (
    <>
      { props.isLoading || isSorting ? (
        <Loader title={ props.isLoading ? LOADING_TEXT : SORTING_TEXT }/>
      ) : (
        <Container className="my-3">
          <Navigation/>
          <h1 className={ TITLE_CLASS_NAME }>
            { `${ props.moduleOrder }.${ sortedLesson.order }. ${ sortedLesson.title }` }
          </h1>

        </Container>
      ) }
    </>
  );
};

export default LessonForm;