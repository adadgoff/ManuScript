import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "react-bootstrap";
import { DEFAULT_IMAGE_UUID, DESCRIPTION_LENGTH, IMAGES_PATH, TITLE_LENGTH } from "../../../../constants/classrooms";
import {
  CARD_BODY_CLASS_NAME,
  CARD_CLASS_NAME,
  CARD_IMG_STYLE,
  CARD_STYLE
} from "../../../../styles/Classroom/ClassroomStyles";
import StringUtils from "../../../../utils/StringUtils";

const ClassroomItem = ({ children, ...props }) => {
  return (
    <Card
      className={ CARD_CLASS_NAME }
      style={ CARD_STYLE }
      onClick={ props.onClick }
    >
      <CardImg
        src={ `${ IMAGES_PATH }/${ props.icon ? props.icon.uuid : DEFAULT_IMAGE_UUID }` }
        alt="Icon"
        style={ CARD_IMG_STYLE }
      />
      <CardBody className={ CARD_BODY_CLASS_NAME }>
        <CardTitle>{ StringUtils.truncateStr(props.title, TITLE_LENGTH) }</CardTitle>
        <CardText>{ StringUtils.truncateStr(props.description, DESCRIPTION_LENGTH) }</CardText>
      </CardBody>
    </Card>
  );
};

export default ClassroomItem;