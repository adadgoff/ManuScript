import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "react-bootstrap";
import { API_PATH } from "../../SETTINGS";

const ClassroomItem = ({ children, ...props }) => {
  const PATH = `${API_PATH}/images`;
  const TITLE_LENGTH = 50;
  const DESCRIPTION_LENGTH = 70;

  const truncateStr = (str, length) => {
    if (str.length >= length) {
      return str.substring(0, length) + "...";
    }
    return str;
  }

  return (
    <Card className="my-3 p-2" style={ { flexDirection: "row", cursor: "pointer" } }>
      <CardImg
        src={ `${ PATH }/${ props.icon.uuid }` }
        alt="Icon"
        style={ { height: "80px", width: "80px", alignContent: "center", } }
      />
      <CardBody className="p-1">
        <CardTitle>{ truncateStr(props.title, TITLE_LENGTH) }</CardTitle>
        <CardText>{ truncateStr(props.description, DESCRIPTION_LENGTH) }</CardText>
      </CardBody>
    </Card>
  );
};

export default ClassroomItem;