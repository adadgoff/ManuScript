import React from "react";
import { Button, Modal } from "react-bootstrap";

const LessonDeleteModal = ({ module, lesson, updatedClassroom, setUpdatedClassroom, ...props }) => {
  const handleDeleteBtn = (event) => {
    event.preventDefault();

    const moduleOrder = module.order;
    const lessonOrder = lesson.order;

    setUpdatedClassroom(prevState => {
      const updatedModules = prevState.modules.map(module => {
        if (module.order === moduleOrder) {
          const updatedLessons = module.lessons.filter(lesson => lesson.order !== lessonOrder);
          updatedLessons.map(lesson => {
            lesson.order -= lesson.order >= lessonOrder;
            return lesson;
          });

          return { ...module, lessons: updatedLessons };
        }
        return module;
      });

      return { ...prevState, modules: updatedModules };
    });

    props.onHide();
  };

  return (
    <Modal { ...props }
           size="lg"
           aria-labelledby="contained-modal-title-vcenter"
           centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Внимание! Вы нажали на кнопку <i><b>"Удалить урок"</b></i>!
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="mb-0 pb-0">
        <p>Вы действительно хотите удалить урок <b>"{ lesson.title }"</b> из модуля <b>"{ module.title }"</b>?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={ props.onHide } className="btn-primary">
          Я случайно...
        </Button>
        <Button className="btn-danger" onClick={ handleDeleteBtn }>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LessonDeleteModal;