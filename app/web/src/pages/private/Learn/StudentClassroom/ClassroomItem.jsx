import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "react-bootstrap";
import { IMAGE_PATH } from "../../../../API/Image/ImageConstants";
import {
  CLASSROOM_DEFAULT_IMAGE_UUID,
  CLASSROOM_DESCRIPTION_LENGTH,
  CLASSROOM_TITLE_LENGTH
} from "../../../../constants/Classroom/ClassroomConstants";
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
        src={ `${ IMAGE_PATH }/${ props.icon ? props.icon.uuid : CLASSROOM_DEFAULT_IMAGE_UUID }` }
        alt="Icon"
        style={ CARD_IMG_STYLE }
      />

      <CardBody className={ CARD_BODY_CLASS_NAME }>
        <CardTitle>{ StringUtils.truncateStr(props.title, CLASSROOM_TITLE_LENGTH) }</CardTitle>
        <CardText>{ StringUtils.truncateStr(props.description, CLASSROOM_DESCRIPTION_LENGTH) }</CardText>
      </CardBody>
    </Card>
  );
};

export default ClassroomItem;