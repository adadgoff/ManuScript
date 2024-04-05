import React, { useState } from "react";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Collapse, Container } from "react-bootstrap";
import { LOADING_TEXT } from "../../../../components/UI/Loader/consts";
import Loader from "../../../../components/UI/Loader/Loader";
import { DEFAULT_IMAGE_UUID, IMAGES_PATH, SORTING_TEXT } from "../../../../constants/classrooms";
import { useSortedClassroom } from "../../../../hooks/ClassroomHooks/useClassroom";
import { CARD_IMG_STYLE, TITLE_CLASS_NAME } from "../../../../styles/Classroom/ClassroomStyles";
import Modules from "../Module/Modules";

const ClassroomForm = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  const [sortedClassroom, isSorting] = useSortedClassroom(props.classroom);

  return (
    <>
      { props.isLoading || isSorting ? (
        <Loader title={ props.isLoading ? LOADING_TEXT : SORTING_TEXT }/>
      ) : (
        <Container className="my-3">
          <h1 className={ TITLE_CLASS_NAME }>{ sortedClassroom.title }</h1>

          <div>
            <Button
              onClick={ () => setOpen(!open) }
              aria-controls="collapse-text"
              aria-expanded={ open }
              className="w-100"
            >
              Подробная информация об учебном классе
            </Button>

            <Collapse in={ open } className="border border-info rounded my-3 p-2">
              <Card
                id="collapse-text"
                style={ { flexDirection: "row" } }
              >
                <CardImg
                  src={ `${ IMAGES_PATH }/${ sortedClassroom.icon ? sortedClassroom.icon.uuid : DEFAULT_IMAGE_UUID }` }
                  alt="Icon"
                  style={ CARD_IMG_STYLE }
                />
                <CardBody className="p-1">
                  <CardTitle>{ `Описание "${ sortedClassroom.title }"` }</CardTitle>
                  <CardText>{ sortedClassroom.description }</CardText>
                </CardBody>
              </Card>
            </Collapse>
          </div>

          <hr className="my-4"/>

          <Modules modules={ sortedClassroom.modules }/>
        </Container>
      ) }
    </>
  );

};

export default ClassroomForm;