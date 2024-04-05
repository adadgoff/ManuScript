import React from "react";
import { Container } from "react-bootstrap";
import Lesson from "./Lesson";

const Lessons = ({ moduleNumber, ...props }) => {
  return (
    <Container>
      { props.lessons && props.lessons.map((lesson, index) =>
        <Lesson
          moduleNumber={ moduleNumber }
          number={ index + 1 }
          lesson={ lesson }
          key={ lesson.id }
        />
      ) }
    </Container>
  );
};

export default Lessons;