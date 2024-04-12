import React from "react";
import { Form, InputGroup, Stack } from "react-bootstrap";
import { MODULE_MAX_TITLE_LENGTH } from "../../../../../constants/Module/ModuleConstants";

const ModuleEditTitleForm = ({ module, handleModuleTitleChange, event }) => {
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <div>
      <Stack direction="horizontal">
        <Form.Label className="mb-0">{ "Название модуля" } </Form.Label>
        <Form.Text className="ms-auto">{ `${ module.title.length } / ${ MODULE_MAX_TITLE_LENGTH }` }</Form.Text>
      </Stack>
      <InputGroup className="mb-2">
        <InputGroup.Text>{ module.order }</InputGroup.Text>
        <Form.Control
          required
          size="lg"
          type="text"
          minLength={ 1 }
          maxLength={ MODULE_MAX_TITLE_LENGTH }
          className="border border-info"
          placeholder={ "Название модуля" }
          onClick={handleClick}
          onChange={ handleModuleTitleChange }
          value={ module.title }
        />
        <Form.Control.Feedback type="invalid" children={ "Название модуля не должно быть пустым!" }/>
      </InputGroup>
    </div>
  );
};

export default ModuleEditTitleForm;