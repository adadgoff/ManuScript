import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle, Stack } from "react-bootstrap";
import { IMAGE_PATH } from "../../../../API/Paths";
import {
  CLASSROOM_TRUNCATE_DESCRIPTION_LENGTH,
  CLASSROOM_TRUNCATE_TITLE_LENGTH
} from "../../../../constants/Classroom/ClassroomConstants";
import { DEFAULT_CLASSROOM_ICON_PATH } from "../../../../constants/Image/ImageConstants";
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
      <Stack direction="horizontal" className="w-100">
        <CardImg
          // src={ `${ IMAGE_PATH }/${ props.icon ? props.icon.uuid : CLASSROOM_DEFAULT_IMAGE_UUID }` }
          src={ props.icon ? `${ IMAGE_PATH }/${ props.icon.uuid }` : DEFAULT_CLASSROOM_ICON_PATH }
          alt="Icon"
          style={ CARD_IMG_STYLE }
        />


        <CardBody className={ CARD_BODY_CLASS_NAME }>
          <CardTitle>{ StringUtils.truncateStr(props.title, CLASSROOM_TRUNCATE_TITLE_LENGTH) }</CardTitle>
          <CardText>{ StringUtils.truncateStr(props.description, CLASSROOM_TRUNCATE_DESCRIPTION_LENGTH) }</CardText>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default ClassroomItem;