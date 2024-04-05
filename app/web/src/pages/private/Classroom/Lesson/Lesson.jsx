import React from "react";
import { Card, CardText } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Lesson = ({ moduleNumber, number, ...props }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="p-2 my-3"
      style={ { cursor: "pointer" } }
      onClick={ () => navigate(`/lesson/${ props.lesson.id }`) }
    >
      <CardText className="fst-italic">{ `${ moduleNumber }.${ number }. ${ props.lesson.title }` }</CardText>
    </Card>
  );
};

export default Lesson;