import LessonEditForm from "../../../../LessonEdit/Lesson/LessonEditForm";

const Lesson = ({ module, lesson, updatedClassroom, setUpdatedClassroom }) => {
  return (
    <LessonEditForm
      module={ module }
      lesson={ lesson }/>
  )
};

export default Lesson;


// console.log(updatedClassroom);
//
// const handleLessonTitleChange = (event) => {
//   const moduleId = lesson.module_id;
//   const lessonId = lesson.id;
//   const newTitle = event.target.value;
//
//   setUpdatedClassroom(prevState => {
//     const updatedClassroomCopy = { ...prevState };
//
//     updatedClassroomCopy.modules = updatedClassroomCopy.modules.map(module => {
//       if (module.id === moduleId) {
//         const updatedModule = { ...module };
//
//         updatedModule.lessons = updatedModule.lessons.map(lesson => {
//           if (lesson.id === lessonId) {
//             return { ...lesson, title: newTitle };
//           }
//           return lesson;
//         });
//
//         return updatedModule;
//       }
//
//       return module;
//     });
//
//     return updatedClassroomCopy;
//   });
// };
//
// // TODO: исправить, так как moduleId может не существовать.
// const handleUpBtn = () => {
//   const moduleId = lesson.module_id;
//   const lessonOrder = lesson.order;
//
//   if (lessonOrder === 1) {
//     return;
//   }
//
//   setUpdatedClassroom(prevState => {
//     const updatedClassroomCopy = { ...prevState };
//
//     updatedClassroomCopy.modules = updatedClassroomCopy.modules.map(module => {
//       if (module.id === moduleId) {
//         const updatedModule = { ...module };
//         const { lessons } = updatedModule;
//
//         const upperLessonIndex = lessons.findIndex(lesson => lesson.order === lessonOrder - 1);
//         const lowerLessonIndex = lessons.findIndex(lesson => lesson.order === lessonOrder);
//
//         const updatedLessons = lessons.map(lesson => {
//           if (lesson.order === lessonOrder - 1) {
//             return { ...lesson, order: lessonOrder };
//           } else if (lesson.order === lessonOrder) {
//             return { ...lesson, order: lessonOrder - 1 };
//           }
//           return lesson;
//         });
//
//         [updatedLessons[upperLessonIndex], updatedLessons[lowerLessonIndex]] = [updatedLessons[lowerLessonIndex], updatedLessons[upperLessonIndex]];
//         return { ...updatedModule, lessons: updatedLessons };
//       }
//
//       return module;
//     });
//
//     return updatedClassroomCopy;
//   });
// };
//
// const handleDownBtn = () => {
//   const moduleId = lesson.module_id;
//   const lessonOrder = lesson.order;
//
//   if (lessonOrder === module.lessons.length) {
//     return;
//   }
//
//   setUpdatedClassroom(prevState => {
//     const updatedClassroomCopy = { ...prevState };
//
//     updatedClassroomCopy.modules = updatedClassroomCopy.modules.map(module => {
//       if (module.id === moduleId) {
//         const updatedModule = { ...module };
//         const { lessons } = updatedModule;
//
//         const upperLessonIndex = lessons.findIndex(lesson => lesson.order === lessonOrder);
//         const lowerLessonIndex = lessons.findIndex(lesson => lesson.order === lessonOrder + 1);
//
//         const updatedLessons = lessons.map(lesson => {
//           if (lesson.order === lessonOrder) {
//             return { ...lesson, order: lessonOrder + 1 };
//           } else if (lesson.order === lessonOrder + 1) {
//             return { ...lesson, order: lessonOrder };
//           }
//           return lesson;
//         });
//
//         [updatedLessons[upperLessonIndex], updatedLessons[lowerLessonIndex]] = [updatedLessons[lowerLessonIndex], updatedLessons[upperLessonIndex]];
//         return { ...updatedModule, lessons: updatedLessons };
//       }
//
//       return module;
//     });
//
//     return updatedClassroomCopy;
//   });
// };
//
// const handleEditBtn = (event) => {
//   // TODO: add modal.
//   event.stopPropagation();
//   window.open(`/${ LESSON_PREFIX }/${ lesson.id }/edit`, "_blank");
// }
//
// const handleDeleteBtn = () => {
//
// }
//
// return (
//   <LessonEditForm
//     module={ module }
//     lesson={ lesson }
//     handleLessonTitleChange={ handleLessonTitleChange }
//     handleUpBtn={ handleUpBtn }
//     handleDownBtn={ handleDownBtn }
//     handleEditBtn={ handleEditBtn }
//     handleDeleteBtn={ handleDeleteBtn }/>
// );

// <div className="mb-2 border-0">
//   <Form.Text>{ `${ lesson.title.length } / ${ LESSON_MAX_TITLE_LENGTH }` }</Form.Text>
//   <InputGroup>
//     <InputGroup.Text>{ `${ module.order }.${ lesson.order }` }</InputGroup.Text>
//     <Form.Control
//       required
//       type="text"
//       minLength={ 1 }
//       maxLength={ MODULE_MAX_TITLE_LENGTH }
//       className="border border-info"
//       placeholder={ "Название урока" }
//       onChange={ handleLessonTitleChange }
//       value={ lesson.title }/>
//
//     <Button
//       variant="outline-primary"
//       className="p-0 fs-5"
//       onClick={ handleUpBtn }
//       title="Переместить урок вверх"
//       aria-label="Переместить урок вверх"
//       disabled={ lesson.order === 1 }
//       children={ "⬆️" }/>
//     <Button
//       variant="outline-primary"
//       className="p-0 fs-5"
//       onClick={ handleDownBtn }
//       title="Переместить урок вниз"
//       aria-label="Переместить урок вниз"
//       disabled={ lesson.order === module.lessons.length }
//       children={ "⬇️" }/>
//     <Button
//       variant="outline-success"
//       className="p-0 fs-5"
//       onClick={ handleEditBtn }
//       title="Перейти на страницу редактирования урока"
//       aria-label="Перейти на страницу редактирования урока"
//       children={ "🖊️" }/>
//     <Button
//       variant="outline-danger"
//       className="p-0 fs-5"
//       title="Удалить урок"
//       aria-label="Удалить урок"
//       onClick={ handleDeleteBtn }
//       children={ "🗑️" }/>
//
//     <Form.Control.Feedback type="invalid" children={ "Название модуля не должно быть пустым!" }/>
//   </InputGroup>
// </div>
