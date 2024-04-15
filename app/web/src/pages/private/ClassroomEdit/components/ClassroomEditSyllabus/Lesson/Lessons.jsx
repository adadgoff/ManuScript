import React from "react";
import LessonCreateForm from "../../Lesson/LessonCreateForm";
import Lesson from "./Lesson";

const Lessons = ({ module, lessons, updatedClassroom, setUpdatedClassroom }) => {
  return (
    <>
      { lessons && lessons.length ? (
        lessons.map(lesson =>
          <Lesson
            key={ lesson.id }
            module={ module }
            lesson={ lesson }
            updatedClassroom={ updatedClassroom }
            setUpdatedClassroom={ setUpdatedClassroom }/>
        )
      ) : (
        <h6 className="text-center bg-info-subtle border border-primary-subtle border-2 rounded p-3 mt-3">Уроков в модуле нет...</h6>
      ) }

      <div className="border border-success mt-4 mb-2"/>

      <LessonCreateForm
        module={ module }
        updatedClassroom={ updatedClassroom }
        setUpdatedClassroom={ setUpdatedClassroom }/>
    </>
  );
};

export default Lessons;