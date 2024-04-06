import React from "react";
import { Card, CardBody, CardText, CardTitle } from "react-bootstrap";
import Lessons from "../Lesson/Lessons";

const Module = ({ moduleOrder, ...props }) => {
  return (
    <Card
      // TODO: maybe use border.
      border="info"
      className="my-4"
      style={ { borderWidth: "2px" } }>
      <CardBody className="pb-1">
        <CardTitle>{ props.module.order }. { props.module.title }</CardTitle>
        <CardText>{ props.module.description }</CardText>

        {/*TODO: maybe use border. <hr className="my-3 border-primary"/>*/ }
        <hr className="my-3"/>

        <Lessons
          moduleOrder={ props.module.order }
          lessons={ props.module.lessons }
        />
      </CardBody>
    </Card>
  );
};

export default Module;