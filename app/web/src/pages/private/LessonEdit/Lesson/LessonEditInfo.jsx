import React from "react";
import LessonEditTitleForm from "../components/LessonEditInfo/LessonEditTitleForm";

const LessonEditInfo = ({ updatedLesson, handleLessonTitleChange }) => {
  return (
    <>
      <LessonEditTitleForm updatedLesson={updatedLesson}
                           handleLessonTitleChange={handleLessonTitleChange}/>
    </>
  );
};

export default LessonEditInfo;