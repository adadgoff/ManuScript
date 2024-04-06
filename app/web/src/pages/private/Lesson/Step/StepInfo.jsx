import React from "react";
import { Card, CardBody, CardText, CardTitle } from "react-bootstrap";

const StepInfo = ({ ...props }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>
          { `${ props.step.id } - ${ props.step.order }` }
        </CardTitle>

        <CardText>
          { `${ props.step.type } - ${ props.step.text } - ${ props.step.answer }` }
        </CardText>
      </CardBody>
    </Card>
  );
};

export default StepInfo;