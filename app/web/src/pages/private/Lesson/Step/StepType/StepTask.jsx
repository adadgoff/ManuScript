import React, { useState } from "react";
import { Form } from "react-bootstrap";
import StepText from "../StepText";
import StepType from "../StepType";

const StepTask = ({ ...props }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <>
      <StepType step={ props.step }/>
      <StepText step={ props.step }/>

      <Form.Group controlId="formFile" className="my-3 border border-info rounded p-3">
        <Form.Label>Прикрепите файл (макс. 5 MB)</Form.Label>
        <Form.Control type="file" accept=""/>
      </Form.Group>
    </>
  );
};

export default StepTask;