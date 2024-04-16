import { cloneDeep } from "lodash";
import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import ImageService from "../../../../API/Image/ImageService";
import LessonService from "../../../../API/Lesson/LessonService";
import { IMAGE_PATH } from "../../../../API/Paths";
import Loader from "../../../../components/UI/Loader/Loader";
import { COPYING_TEXT, LOADING_TEXT, SORTING_TEXT } from "../../../../components/UI/Loader/LoaderConstants";
import { useUpdatedLesson } from "../../../../hooks/Lesson/useLesson";
import StringUtils from "../../../../utils/StringUtils";
import DangerZoneAccordion from "../components/LessonEditForm/DangerZoneAccordion";
import LessonSavingModal from "../components/LessonEditForm/LessonSavingModal";
import SaveCancelMenu from "../components/LessonEditForm/SaveCancelMenu";
import LessonEditInfo from "./LessonEditInfo";
import LessonEditSyllabus from "./LessonEditSyllabus";

const LessonEditForm = ({ lesson, setLesson, isLoading }) => {
  const base64Regex = /<img[^>]+src="(data:image\/.*?;base64,.*?)"/g;

  const [saveModalShow, setSaveModalShow] = useState(false);

  const [validated, setValidated] = useState(false);
  const [updatedLesson, sortedLesson, isCopying, isSorting, setUpdatedLesson] = useUpdatedLesson(lesson);
  const [prevStateLesson, setPrevStateLesson] = useState(cloneDeep(sortedLesson));

  useEffect(() => {
    setPrevStateLesson(cloneDeep(sortedLesson));
  }, [sortedLesson]);

  console.log(prevStateLesson);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    if (form.checkValidity() === true) {
      try {
        setSaveModalShow(true);
        const requestSteps = await Promise.all(updatedLesson.steps.map(async step => {
          const content = step.editorRef.current.getContent();

          const stepText = await StringUtils.replaceAsync(content, base64Regex, async (full, base64String) => {
            const blob = await fetch(base64String).then(res => res.blob());
            const response = await ImageService.uploadImage(blob);
            return full.replace(base64String, `${ IMAGE_PATH }/${ response.uuid }`);
          });

          return {
            id: step.id,
            order: step.order,
            type: step.type,
            text: stepText,
            answer: step.answer,
          };
        }));

        const requestLesson = {
          id: updatedLesson.id,
          title: updatedLesson.title,
          steps: requestSteps,
        };

        const response = await LessonService.updateLesson(requestLesson);

        const updatedSteps = updatedLesson.steps.map((updatedStep, index) => {
          const responseStep = response.steps.find(s => s.order === updatedStep.order);
          return {
            id: responseStep.id,
            order: responseStep.order,
            type: responseStep.type,
            text: responseStep.text,
            answer: responseStep.answer,
            editorRef: updatedStep.editorRef
          };
        });

        setUpdatedLesson({
          id: response.id,
          title: response.title,
          steps: updatedSteps,
        });

        setPrevStateLesson({
          id: response.id,
          title: response.title,
          steps: updatedSteps,
        });

      } catch (error) {
        console.log("Error saving classroom", error);
      } finally {
        setSaveModalShow(false);
      }
    }
  };

  const handleLessonTitleChange = (event) => {
    const newTitle = event.target.value;
    setUpdatedLesson({ ...updatedLesson, title: newTitle });
  };

  return (
    <>
      <LessonSavingModal
        show={ saveModalShow }/>

      { (isLoading || isSorting || isCopying) ? (
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

            <SaveCancelMenu
              prevStateLesson={ prevStateLesson }
              updatedLesson={ updatedLesson }
              setUpdatedLesson={ setUpdatedLesson }/>

          </Form>

          <div className="my-4 border border-info border-2"/>

          <DangerZoneAccordion lesson={ updatedLesson }/>
        </Container>
      ) }
    </>
  );
};

export default LessonEditForm;