import React from "react";
import { Button, Card, CardBody, CardImg, CardText, CardTitle } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CLASSROOM_PREFIX } from "../../../../API/Classroom/ClassroomPrefix";
import { IMAGE_PATH } from "../../../../API/Paths";
import {
  CLASSROOM_DEFAULT_IMAGE_UUID,
  CLASSROOM_TRUNCATE_DESCRIPTION_LENGTH,
  CLASSROOM_TRUNCATE_TITLE_LENGTH
} from "../../../../constants/Classroom/ClassroomConstants";
import {
  CARD_BODY_CLASS_NAME,
  CARD_CLASS_NAME,
  CARD_IMG_STYLE,
  CARD_STYLE
} from "../../../../styles/Classroom/ClassroomStyles";
import StringUtils from "../../../../utils/StringUtils";

const ClassroomItem = ({ children, ...props }) => {
  const navigate = useNavigate();

  const handleEditBtn = (event) => {
    event.stopPropagation();
    navigate(`/${ CLASSROOM_PREFIX }/${ props.id }/edit`);
  }

  const handleStatsBtn = (event) => {
    event.stopPropagation();
  }

  return (
    <Card
      className={ CARD_CLASS_NAME }
      style={ CARD_STYLE }
      onClick={ props.onClick }
    >
      <div className="d-flex align-items-center justify-content-center">
        <CardImg
          src={ `${ IMAGE_PATH }/${ props.icon ? props.icon.uuid : CLASSROOM_DEFAULT_IMAGE_UUID }` }
          alt="Icon"
          style={ CARD_IMG_STYLE }
        />
      </div>

      <CardBody className={ CARD_BODY_CLASS_NAME }>
        <CardTitle>{ StringUtils.truncateStr(props.title, CLASSROOM_TRUNCATE_TITLE_LENGTH) }</CardTitle>
        <CardText>{ StringUtils.truncateStr(props.description, CLASSROOM_TRUNCATE_DESCRIPTION_LENGTH) }</CardText>
      </CardBody>

      <div className="d-flex flex-column align-items-center justify-content-center">
        <Button
          onClick={ handleEditBtn }
          variant="outline-primary"
          children="Редактировать"
          className="my-1 w-100"/>

        <Button
          onClick={ handleStatsBtn }
          variant="outline-primary"
          children="Статистика"
          className="my-1 w-100"/>
      </div>
    </Card>
  );
};

export default ClassroomItem;