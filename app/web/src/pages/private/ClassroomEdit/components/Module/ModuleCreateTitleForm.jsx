import React from "react";
import { Form, Stack } from "react-bootstrap";
import { MODULE_MAX_TITLE_LENGTH } from "../../../../../constants/Module/ModuleConstants";

const ModuleCreateTitleForm = ({ title, setTitle, ...props }) => {
  return (
    <div>
      <Stack direction="horizontal">
        <Form.Label className="mb-0">Название модуля</Form.Label>
        <Form.Text className="ms-auto">{ `${ title.length } / ${ MODULE_MAX_TITLE_LENGTH }` }</Form.Text>
      </Stack>
      <Form.Control
        required
        size="lg"
        type="text"
        minLength={ 1 }
        maxLength={ MODULE_MAX_TITLE_LENGTH }
        className="border border-info rounded"
        placeholder={ "Название модуля" }
        onChange={ event => setTitle(event.target.value) }
        { ...props }
      />
      <Form.Control.Feedback type="invalid" children={ "Название модуля не должно быть пустым!" }/>
    </div>
  );
};

export default ModuleCreateTitleForm;