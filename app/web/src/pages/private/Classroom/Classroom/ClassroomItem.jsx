import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle, Stack } from "react-bootstrap";
import { IMAGE_PATH } from "../../../../API/Paths";
import { DEFAULT_CLASSROOM_ICON_PATH } from "../../../../constants/Image/ImageConstants";
import {
  CARD_BODY_CLASS_NAME,
  CARD_CLASS_NAME,
  CARD_IMG_STYLE,
  CARD_STYLE
} from "../../../../styles/Classroom/ClassroomStyles";

const ClassroomItem = ({ classroom }) => {
  return (
    <Card className={ CARD_CLASS_NAME } style={ CARD_STYLE }>
      <Stack direction="horizontal" className="w-100">
        <CardImg
          // src={ `${ IMAGE_PATH }/${ classroom.icon ? classroom.icon.uuid : CLASSROOM_DEFAULT_IMAGE_UUID }` }
          src={ classroom.icon ? `${ IMAGE_PATH }/${ classroom.icon.uuid }` : DEFAULT_CLASSROOM_ICON_PATH }
          alt="Icon"
          style={ CARD_IMG_STYLE }
        />

        <CardBody className={ CARD_BODY_CLASS_NAME }>
          <CardTitle>{ `Описание "${ classroom.title }"` }</CardTitle>
          <CardText>{ classroom.description }</CardText>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default ClassroomItem;