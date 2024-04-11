import React from "react";
import { Button, ButtonGroup, Card, CardBody, Form, InputGroup, Stack } from "react-bootstrap";
import { MODULE_MAX_DESCRIPTION_LENGTH, MODULE_MAX_TITLE_LENGTH } from "../../../../constants/Module/ModuleConstants";
import Lessons from "../Lesson/Lessons";

const Module = ({ module, updatedClassroom, setUpdatedClassroom }) => {
  const handleModuleTitleChange = (event) => {
    const moduleId = module.id;
    const newTitle = event.target.value;

    setUpdatedClassroom(prevState => {
      const updatedModules = prevState.modules.map(module => {
        if (module.id === moduleId) {
          return { ...module, title: newTitle };
        }
        return module;
      });

      return { ...prevState, modules: updatedModules };
    });
  };

  const handleModuleDescriptionChange = (event) => {
    const moduleId = module.id;
    const newDescription = event.target.value;

    setUpdatedClassroom(prevState => {
      const updatedModules = prevState.modules.map(module => {
        if (module.id === moduleId) {
          return { ...module, description: newDescription };
        }
        return module;
      });

      return { ...prevState, modules: updatedModules }
    });
  };


  const handleUpBtn = () => {

  }

  const handleDownBtn = () => {

  }

  const handleDeleteBtn = () => {

  }

  return (
    <Stack direction="horizontal" className="mt-3 rounded ms-2">
      <Card
        border="secondary"
        className="w-100 me-2 p-1 pb-2"
        style={ { borderWidth: "3px" } }
      >
        <CardBody className="p-0">
          <Stack direction="horizontal">
            <Form.Label className="mb-0">{ `Название модуля "${ module.title }"` } </Form.Label>
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
              onChange={ handleModuleTitleChange }
              value={ module.title }
            />
            <Form.Control.Feedback type="invalid" children={ "Название модуля не должно быть пустым!" }/>
          </InputGroup>

          <Stack direction="horizontal">
            <Form.Label className="mb-0">{ `Описание модуля "${ module.title }"` } </Form.Label>
            <Form.Text className="ms-auto">{ `${ module.description.length } / ${ MODULE_MAX_DESCRIPTION_LENGTH }` }</Form.Text>
          </Stack>
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

          <div className="border border-warning mt-4 mb-3"/>

          <Lessons
            module={ module }
            lessons={ module.lessons }
            updatedClassroom={ updatedClassroom }
            setUpdatedClassroom={ setUpdatedClassroom }/>
        </CardBody>
      </Card>

      <ButtonGroup vertical className="ms-auto">
        <Button variant="outline-primary"
                onClick={ handleUpBtn }
                disabled={ module.order === 1 }
                children={ "Вверх" }/>

        <Button variant="outline-primary"
                onClick={ handleDownBtn }
                disabled={ module.order === updatedClassroom.modules.length }
                children={ "Вниз" }/>

        <Button variant="outline-danger"
                onClick={ handleDeleteBtn }
                children={ "Удалить" }/>
      </ButtonGroup>
    </Stack>
  );
};

export default Module;