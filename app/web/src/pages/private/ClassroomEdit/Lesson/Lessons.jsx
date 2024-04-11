import React from "react";
import { Button } from "react-bootstrap";
import Lesson from "./Lesson";

const Lessons = ({ module, lessons, updatedClassroom, setUpdatedClassroom }) => {
  return (
    <>
      { lessons && lessons.map(lesson =>
        <Lesson
          key={ lesson.id }
          module={ module }
          lesson={ lesson }
          updatedClassroom={ updatedClassroom }
          setUpdatedClassroom={ setUpdatedClassroom }/>
      ) }

      <div className="border border-warning my-4"/>

      <Button
        className="w-100 btn-primary mb-3"
        children={ "Создать урок" }/>
    </>
  );
};

export default Lessons;