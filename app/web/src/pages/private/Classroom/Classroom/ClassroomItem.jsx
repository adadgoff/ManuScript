import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "react-bootstrap";
import { DEFAULT_IMAGE_UUID, IMAGES_PATH } from "../../../../constants/classrooms";
import { CARD_IMG_STYLE } from "../../../../styles/Classroom/ClassroomStyles";

const ClassroomItem = ({ classroom }) => {
  return (
    <Card
      id="collapse-text"
      style={ { flexDirection: "row" } }
    >
      <CardImg
        src={ `${ IMAGES_PATH }/${ classroom.icon ? classroom.icon.uuid : DEFAULT_IMAGE_UUID }` }
        alt="Icon"
        style={ CARD_IMG_STYLE }
      />
      <CardBody className="p-1">
        <CardTitle>{ `Описание "${ classroom.title }"` }</CardTitle>
        <CardText>{ classroom.description }</CardText>
      </CardBody>
    </Card>
  );
};

export default ClassroomItem;