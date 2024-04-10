import React from "react";
import { Button, ButtonGroup, Card, CardBody, Form, InputGroup, Stack } from "react-bootstrap";
import { MODULE_MAX_DESCRIPTION_LENGTH, MODULE_MAX_TITLE_LENGTH } from "../../../../constants/Module/ModuleConstants";

const Module = ({ module, updatedClassroom, setUpdatedClassroom }) => {
  const handleModuleTitleChange = (event) => {
    const moduleId = module.id;
    const newTitle = event.target.value;

    setUpdatedClassroom(prevState => {
      const updatedModules = prevState.modules.map(module =>
        module.id === moduleId ? { ...module, title: newTitle } : module
      );

      return { ...prevState, modules: updatedModules };
    });
  };

  const handleModuleDescriptionChange = (event) => {
    const moduleId = module.id;
    const newDescription = event.target.value;

    setUpdatedClassroom(prevState => {
      const updatedModules = prevState.modules.map(module =>
        module.id === moduleId ? { ...module, description: newDescription } : module
      );

      return { ...prevState, modules: updatedModules }
    });
  };


  function handleUpBtn() {

  }

  function handleDownBtn() {

  }

  function handleDeleteBtn() {

  }

  return (
    <Stack direction="horizontal" className="my-4 border border-secondary-subtle rounded mx-2">
      <Card
        border="secondary"
        className="w-100 me-2 p-1"
        style={ { borderWidth: "2px" } }
      >
        <CardBody className="p-0">
          <Form.Text>{ `${ module.title.length } / ${ MODULE_MAX_TITLE_LENGTH }` }</Form.Text>
          <InputGroup className="mb-2">
            <InputGroup.Text>{ module.order }</InputGroup.Text>
            <Form.Control
              required
              type="text"
              minLength={ 1 }
              maxLength={ MODULE_MAX_TITLE_LENGTH }
              className="border border-info"
              placeholder={ "Название модуля" }
              onChange={ handleModuleTitleChange }
              value={ module.title }
            />
            <Form.Control.Feedback type="invalid" children={ "Название модуля не должно быть пустым!" }/>
          </InputGroup>

          <Form.Text>{ `${ module.description.length } / ${ MODULE_MAX_DESCRIPTION_LENGTH }` }</Form.Text>
          <Form.Control
            required
            type="text"
            minLength={ 1 }
            maxLength={ MODULE_MAX_DESCRIPTION_LENGTH }
            className="border border-info"
            placeholder={ "Описание модуля" }
            onChange={ handleModuleDescriptionChange }
            value={ module.description }
          />
          <Form.Control.Feedback type="invalid" children={ "Описание модуля не должно быть пустым!" }/>
        </CardBody>
      </Card>

      <ButtonGroup vertical className="ms-auto">
        <Button variant="outline-primary"
                onClick={ handleUpBtn }
                disabled={ module.order === 1 }
                children={ "Вверх" }/>

        <Button variant="outline-primary"
                onClick={ handleDownBtn }
                disabled={module.order === updatedClassroom.modules.length}
                children={ "Вниз" }/>

        <Button variant="outline-danger"
                onClick={ handleDeleteBtn }
                children={ "Удалить" }/>
      </ButtonGroup>
    </Stack>
  );
};

export default Module;