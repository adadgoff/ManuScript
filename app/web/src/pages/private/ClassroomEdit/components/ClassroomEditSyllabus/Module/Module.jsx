import React, { useState } from "react";
import { Accordion, Button, ButtonGroup, Card, Stack } from "react-bootstrap";
import ModuleDeleteModal from "../../Module/ModuleDeleteModal";
import ModuleEditDescriptionForm from "../../Module/ModuleEditDescriptionForm";
import ModuleEditTitleForm from "../../Module/ModuleEditTitleForm";
import Lessons from "../Lesson/Lessons";

const Module = ({ module, updatedClassroom, setUpdatedClassroom }) => {
  const [modalShow, setModalShow] = useState(false);

  const handleModuleTitleChange = (event) => {
    const moduleOrder = module.order;
    const newTitle = event.target.value;

    setUpdatedClassroom(prevState => {
      const updatedModules = prevState.modules.map(module => {
        if (module.order === moduleOrder) {
          return { ...module, title: newTitle };
        }
        return module;
      });

      return { ...prevState, modules: updatedModules };
    });
  };

  const handleModuleDescriptionChange = (event) => {
    const moduleOrder = module.order;
    const newDescription = event.target.value;

    setUpdatedClassroom(prevState => {
      const updatedModules = prevState.modules.map(module => {
        if (module.order === moduleOrder) {
          return { ...module, description: newDescription };
        }
        return module;
      });

      return { ...prevState, modules: updatedModules }
    });
  };

  const handleBtnGroupClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleUpBtn = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (module.order === 1) {
      return;
    }

    const moduleOrder = module.order;
    const updatedModules = [...updatedClassroom.modules];

    updatedModules[moduleOrder - 2].order++;
    updatedModules[moduleOrder - 1].order--;
    [updatedModules[moduleOrder - 2], updatedModules[moduleOrder - 1]] = [updatedModules[moduleOrder - 1], updatedModules[moduleOrder - 2]];

    setUpdatedClassroom(prevState => ({
      ...prevState,
      modules: updatedModules,
    }));
  };

  const handleDownBtn = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (module.order === updatedClassroom.modules.length) {
      return;
    }

    const moduleOrder = module.order;
    const updatedModules = [...updatedClassroom.modules];

    updatedModules[moduleOrder - 1].order++;
    updatedModules[moduleOrder].order--;
    [updatedModules[moduleOrder - 1], updatedModules[moduleOrder]] = [updatedModules[moduleOrder], updatedModules[moduleOrder - 1]];

    setUpdatedClassroom(prevState => ({
      ...prevState,
      modules: updatedModules,
    }));
  }

  const handleDeleteBtn = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setModalShow(true);
  }

  return (
    <>
      <ModuleDeleteModal
        show={ modalShow }
        onHide={ () => setModalShow(false) }
        module={ module }
        updatedClassroom={ updatedClassroom }
        setUpdatedClassroom={ setUpdatedClassroom }/>

      <Accordion>
        <Accordion.Item eventKey="1">
          <Accordion.Button className="p-1 pt-2 pb-3 border border-secondary rounded border-2">
            <Card className="w-100 border-0">
              <Stack direction="horizontal" className="ps-1 pe-3 w-100">
                <ButtonGroup vertical className="me-2" onClick={ handleBtnGroupClick }>
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

                <Stack direction="vertical" className="ms-auto">
                  <ModuleEditTitleForm module={ module }
                                       handleModuleTitleChange={ handleModuleTitleChange }/>
                  <ModuleEditDescriptionForm module={ module }
                                             handleModuleDescriptionChange={ handleModuleDescriptionChange }/>
                </Stack>

              </Stack>
            </Card>
          </Accordion.Button>

          <Accordion.Body className="border border-secondary-subtle border-2 rounded p-1 pt-2 pb-3">
            <Lessons
              module={ module }
              lessons={ module.lessons }
              updatedClassroom={ updatedClassroom }
              setUpdatedClassroom={ setUpdatedClassroom }/>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default Module;