import { useState } from "react";
import { LESSON_PREFIX } from "../../../../../../API/Lesson/LessonConstants";
import LessonDeleteModal from "../../Lesson/LessonDeleteModal";
import LessonEditItem from "../../Lesson/LessonEditItem";

const Lesson = ({ module, lesson, updatedClassroom, setUpdatedClassroom }) => {
  const [modalShow, setModalShow] = useState(false);

  const handleLessonTitleChange = (event) => {
    const moduleOrder = module.order;
    const lessonOrder = lesson.order;
    const newTitle = event.target.value;

    setUpdatedClassroom(prevState => {
      const updatedModules = prevState.modules.map(module => {
        if (module.order === moduleOrder) {
          const updatedLessons = module.lessons.map(lesson => {
            if (lesson.order === lessonOrder) {
              return { ...lesson, title: newTitle };
            }
            return lesson;
          });

          return { ...module, lessons: updatedLessons };
        }
        return module;
      });

      return { ...prevState, modules: updatedModules };
    });
  };

  const handleUpBtn = () => {
    if (lesson.order === 1) {
      return;
    }

    const moduleOrder = module.order;
    const lessonOrder = lesson.order;

    setUpdatedClassroom(prevState => {
      const updatedModules = prevState.modules.map(module => {
        if (module.order === moduleOrder) {
          const updatedLessons = [...module.lessons];

          updatedLessons[lessonOrder - 2].order++;
          updatedLessons[lessonOrder - 1].order--;
          [updatedLessons[lessonOrder - 2], updatedLessons[lessonOrder - 1]] = [updatedLessons[lessonOrder - 1], updatedLessons[lessonOrder - 2]]

          return { ...module, lessons: updatedLessons };
        }
        return module;
      });

      return { ...prevState, modules: updatedModules };
    });
  }

  const handleDownBtn = () => {
    if (lesson.order === module.lessons.length) {
      return;
    }

    const moduleOrder = module.order;
    const lessonOrder = lesson.order;

    setUpdatedClassroom(prevState => {
      const updatedModules = prevState.modules.map(module => {
        if (module.order === moduleOrder) {
          const updatedLessons = [...module.lessons];

          updatedLessons[lessonOrder - 1].order++;
          updatedLessons[lessonOrder].order--;
          [updatedLessons[lessonOrder - 1], updatedLessons[lessonOrder]] = [updatedLessons[lessonOrder], updatedLessons[lessonOrder - 1]];

          return { ...module, lessons: updatedLessons };
        }
        return module;
      });

      return { ...prevState, modules: updatedModules };
    });
  }

  const handleEditBtn = () => {
    window.open(`/${ LESSON_PREFIX }/${ lesson.id }/edit`, "_blank");
  }

  const handleDeleteBtn = () => {
    setModalShow(true);
  }

  return (
    <>
      <LessonDeleteModal
        show={ modalShow }
        onHide={ () => setModalShow(false) }
        module={ module }
        lesson={ lesson }
        updatedClassroom={ updatedClassroom }
        setUpdatedClassroom={ setUpdatedClassroom }/>

      <LessonEditItem
        module={ module }
        lesson={ lesson }
        handleLessonTitleChange={ handleLessonTitleChange }
        handleUpBtn={ handleUpBtn }
        handleDownBtn={ handleDownBtn }
        handleEditBtn={ handleEditBtn }
        handleDeleteBtn={ handleDeleteBtn }/>
    </>
  )
};

export default Lesson;
