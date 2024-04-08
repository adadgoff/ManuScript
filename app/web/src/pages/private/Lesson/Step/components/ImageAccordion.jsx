import React from "react";
import { Accordion, Image } from "react-bootstrap";
import { IMAGE_PATH } from "../../../../../API/Image/ImageConstants";

const ImageAccordion = ({ ...props }) => {
  console.log(`${ IMAGE_PATH }${ props.userStep.user_image_uuid }`);
  return (
    // <Accordion defaultActiveKey="0">
    //   <Accordion.Item eventKey="0">
    //     <Image src={ `${ IMAGE_PATH }/${ props.userStep.user_image_uuid }` } thumbnail/>
    //   </Accordion.Item>
    // </Accordion>
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="1">
        <Accordion.Header>Прикрепленная работа</Accordion.Header>
        <Accordion.Body>
          <Image src={ `${ IMAGE_PATH }/${ props.userStep.user_image_uuid }` } thumbnail/>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ImageAccordion;