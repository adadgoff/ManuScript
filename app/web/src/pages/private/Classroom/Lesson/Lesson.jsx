import React from "react";
import { Card, CardText } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Lesson = ({ moduleOrder, number, ...props }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="p-2 my-3 bg-body-secondary"
      style={ { transition: "color 0.3s, text-decoration 0.3s", cursor: "pointer" } }
      onClick={ () => navigate(`/lesson/${ props.lesson.id }`) }
      onMouseEnter={ (event) => {
        event.currentTarget.classList.add("text-primary");
        event.currentTarget.classList.add("text-decoration-underline");
      } }
      onMouseLeave={ (event) => {
        event.currentTarget.classList.remove("text-primary");
        event.currentTarget.classList.remove("text-decoration-underline")
      } }
    >
      <CardText className="fst-italic">
        { `${ moduleOrder }.${ props.lesson.order }. ${ props.lesson.title }` }
      </CardText>
    </Card>
  );
};

export default Lesson;