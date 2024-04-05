import React from "react";
import { Card, CardBody, CardText, CardTitle } from "react-bootstrap";
import Lessons from "../Lesson/Lessons";

const Module = ({ number, ...props }) => {
  return (
    <Card className="my-3">
      <CardBody className="pb-2">
        <CardTitle>{ number }. { props.module.title }</CardTitle>
        <CardText>{ props.module.description }</CardText>

        <hr className="my-3"/>

        <Lessons
          moduleNumber={ number }
          lessons={ props.module.lessons }
        />
      </CardBody>
    </Card>
  );
};

export default Module;