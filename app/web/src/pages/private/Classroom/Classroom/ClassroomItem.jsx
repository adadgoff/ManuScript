import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "react-bootstrap";
import { IMAGE_PATH } from "../../../../API/Image/ImageConstants";
import { CLASSROOM_DEFAULT_IMAGE_UUID } from "../../../../constants/Classroom/ClassroomConstants";
import { CARD_IMG_STYLE } from "../../../../styles/Classroom/ClassroomStyles";

const ClassroomItem = ({ classroom }) => {
  return (
    <Card
      className="p-2"
      style={ { flexDirection: "row" } }
    >
      <CardImg
        src={ `${ IMAGE_PATH }/${ classroom.icon ? classroom.icon.uuid : CLASSROOM_DEFAULT_IMAGE_UUID }` }
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