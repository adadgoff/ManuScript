import React from "react";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CLASSROOM_PREFIX } from "../../../../API/Classroom/ClassroomPrefix";
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
  const navigate = useNavigate();

  const handleEditBtn = (event) => {
    event.stopPropagation();
    navigate(`/${ CLASSROOM_PREFIX }/${ props.id }/edit`);
  }

  const handleCheckBtn = (event) => {
    event.stopPropagation();
    navigate(`/${ CLASSROOM_PREFIX }/${ props.id }/check`);
  }

  return (
    <Card
      className={ CARD_CLASS_NAME }
      style={ CARD_STYLE }
      onClick={ props.onClick }
    >
      <Stack direction="horizontal" className="w-100">
        <CardImg
          src={ props.icon ? `${ IMAGE_PATH }/${ props.icon.uuid }` : DEFAULT_CLASSROOM_ICON_PATH }
          alt="Icon"
          style={ CARD_IMG_STYLE }
        />

        <CardBody className={ CARD_BODY_CLASS_NAME }>
          <CardTitle>{ StringUtils.truncateStr(props.title, CLASSROOM_TRUNCATE_TITLE_LENGTH) }</CardTitle>
          <CardText>{ StringUtils.truncateStr(props.description, CLASSROOM_TRUNCATE_DESCRIPTION_LENGTH) }</CardText>
        </CardBody>

        <div className="d-flex flex-column align-items-center justify-content-center">
          <Button
            onClick={ handleEditBtn }
            variant="outline-primary"
            className="my-1 w-100"
            children={ "Редактировать" }/>

          <Button
            onClick={ handleCheckBtn }
            variant="outline-primary"
            className="my-1 w-100"
            children={ "Проверка работ" }/>
        </div>
      </Stack>
    </Card>
  )
    ;
};

export default ClassroomItem;