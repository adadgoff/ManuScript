import React from "react";
import { Form, Stack } from "react-bootstrap";
import { MODULE_MAX_DESCRIPTION_LENGTH } from "../../../../../constants/Module/ModuleConstants";

const ModuleEditDescriptionForm = ({ module, handleModuleDescriptionChange }) => {
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <div>
      <Stack direction="horizontal">
        <Form.Label className="mb-0">{ "Описание модуля" } </Form.Label>
        <Form.Text
          className="ms-auto">{ `${ module.description.length } / ${ MODULE_MAX_DESCRIPTION_LENGTH }` }</Form.Text>
      </Stack>
      <Form.Control
        required
        as="textarea"
        minLength={ 1 }
        maxLength={ MODULE_MAX_DESCRIPTION_LENGTH }
        className="border border-info"
        placeholder={ "Описание модуля" }
        onClick={ handleClick }
        onChange={ handleModuleDescriptionChange }
        value={ module.description }
      />
      <Form.Control.Feedback type="invalid" children={ "Описание модуля не должно быть пустым!" }/>
    </div>
  );
};

export default ModuleEditDescriptionForm;