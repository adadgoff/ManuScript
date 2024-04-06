import React from "react";
import { Container } from "react-bootstrap";
import BackButton from "../../../../components/BackButton/BackButton";
import { LOADING_TEXT } from "../../../../components/UI/Loader/consts";
import Loader from "../../../../components/UI/Loader/Loader";
import { SORTING_TEXT } from "../../../../constants/classrooms";
import { useSortedLesson } from "../../../../hooks/LessonHooks/useLesson";
import { useCurrentStep } from "../../../../hooks/StepHooks/useStep";
import { TITLE_CLASS_NAME } from "../../../../styles/Classroom/ClassroomStyles";
import LessonNavigation from "../Navigation/LessonNavigation";
import Step from "../Step/Step";

const LessonForm = ({ ...props }) => {
  const [sortedLesson, isSorting] = useSortedLesson(props.lesson);
  const [currentStep, setCurrentStep] = useCurrentStep(sortedLesson);

  return (
    <Container>
      <BackButton children="Вернуться к содержанию" className="mt-3"/>

      { props.isLoading || isSorting ? (
        <Loader title={ props.isLoading ? LOADING_TEXT : SORTING_TEXT }/>
      ) : (
        <>
          <h1 className={ TITLE_CLASS_NAME }>
            { `${ props.moduleOrder }.${ sortedLesson.order }. ${ sortedLesson.title }` }
          </h1>

          <LessonNavigation
            currentStep={ currentStep }
            setCurrentStep={ setCurrentStep }
            steps={ sortedLesson.steps }
          />

          { sortedLesson.steps.length ? (
            <Step step={ currentStep }/>
          ) : (
            <h2 className="text-center">Шагов в уроке нет...</h2>
          ) }
        </>
      ) }
    </Container>
  );
};

export default LessonForm;