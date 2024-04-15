import React from "react";
import LessonEditTitleForm from "../components/LessonEditForm/LessonEditTitleForm";

const LessonEditInfo = ({ updatedLesson, handleLessonTitleChange }) => {
  return (
    <>
      <LessonEditTitleForm updatedLesson={updatedLesson}
                           handleLessonTitleChange={handleLessonTitleChange}/>
    </>
  );
};

export default LessonEditInfo;