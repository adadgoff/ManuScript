import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Loader from "../../../../components/UI/Loader/Loader";
import { COPYING_TEXT, LOADING_TEXT, SORTING_TEXT } from "../../../../components/UI/Loader/LoaderConstants";
import { useUpdatedLesson } from "../../../../hooks/Lesson/useLesson";
import StepUtils from "../components/Step/StepUtils";
import LessonEditInfo from "./LessonEditInfo";
import LessonEditSyllabus from "./LessonEditSyllabus";

const LessonEditForm = ({ module, lesson, isLoading }) => {
  const [validated, setValidated] = useState(false);
  const [updatedLesson, sortedLesson, isCopying, isSorting, setUpdatedLesson] = useUpdatedLesson(lesson);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    const editorContent = StepUtils.extractEditorContentFromSteps(updatedLesson.steps);
    console.log(editorContent);
    // TODO: обработать картинки в steps.text
  }

  const handleLessonTitleChange = (event) => {
    setUpdatedLesson(prevState => ({
      ...prevState,
      title: event.target.value,
    }));
  };

  return (
    <>
      { isLoading || isSorting || isCopying ? (
        <Loader title={
          (isLoading && LOADING_TEXT) ||
          (isSorting && SORTING_TEXT) ||
          (isCopying && COPYING_TEXT)
        }/>
      ) : (
        <Container>
          <Form noValidate validated={ validated } onSubmit={ handleSubmit }>
            <h1 className="text-bg-primary text-center text-white rounded p-3 my-3 fs-4 fw-medium">
              Редактирование урока
            </h1>

            <LessonEditInfo updatedLesson={ updatedLesson }
                            handleLessonTitleChange={ handleLessonTitleChange }/>

            <LessonEditSyllabus updatedLesson={ updatedLesson }
                                setUpdatedLesson={ setUpdatedLesson }/>

            <Button type="submit" children={ "Сохранить" }/>
            { /*<SaveCancelMenu/>*/ }
          </Form>
        </Container>
      ) }
    </>
  );
};

export default LessonEditForm;