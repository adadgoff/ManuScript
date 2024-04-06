import React from "react";
import { Container } from "react-bootstrap";
import Lesson from "./Lesson";

const Lessons = ({ moduleOrder, ...props }) => {
  return (
    <Container>
      { props.lessons && props.lessons.map(lesson =>
        <Lesson
          moduleOrder={ moduleOrder }
          lesson={ lesson }
          key={ lesson.id }
        />
      ) }
    </Container>
  );
};

export default Lessons;