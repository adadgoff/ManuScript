import React from "react";
import Lesson from "./Lesson";

const Lessons = ({ moduleOrder, ...props }) => {
  return (
    <>
      { props.lessons && props.lessons.map(lesson =>
        <Lesson
          moduleOrder={ moduleOrder }
          lesson={ lesson }
          key={ lesson.id }
        />
      ) }
    </>
  );
};

export default Lessons;