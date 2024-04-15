import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import ClassroomService from "../../../../API/Classroom/ClassroomService";
import Loader from "../../../../components/UI/Loader/Loader";
import { COPYING_TEXT, LOADING_TEXT, SORTING_TEXT } from "../../../../components/UI/Loader/LoaderConstants";
import { IMAGE_EXTENSION_ERROR, IMAGE_SIZE_ERROR } from "../../../../constants/Error/ErrorConstants";
import { IMAGE_MAX_SIZE } from "../../../../constants/Image/ImageConstants";
import { useUpdatedClassroom } from "../../../../hooks/Classroom/useClassroom";
import ClassroomSaveModal from "../components/ClassroomEditForm/ClassroomSaveModal";
import DangerZoneAccordion from "../components/ClassroomEditForm/DangerZoneAccordion";
import SaveCancelMenu from "../components/ClassroomEditForm/SaveCancelMenu";
import StudentZoneAccordion from "../components/ClassroomEditForm/StudentZoneAccordion";
import ClassroomEditInfo from "./ClassroomEditInfo";
import ClassroomEditSyllabus from "./ClassroomEditSyllabus";

const ClassroomEditForm = ({ classroom, setClassroom, isLoading }) => {
  const [errorFileMessage, setErrorFileMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [saveModalShow, setSaveModalShow] = useState(false);

  const [validated, setValidated] = useState(false);
  const [updatedClassroom, sortedClassroom, isCopying, isSorting, setUpdatedClassroom] = useUpdatedClassroom(classroom);

  useEffect(() => {
    setUpdatedClassroom(classroom);
  }, []);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    if (form.checkValidity() === true) {
      try {
        setSaveModalShow(true);
        const response = await ClassroomService.updateClassroom(updatedClassroom, selectedFile);
        setClassroom({ ...response });
      } catch (error) {
        console.log("Error updating classroom", error);
      } finally {
        setSaveModalShow(false);
      }
    }
  };

  const handleClassroomTitleChange = (event) => {
    setUpdatedClassroom(prevState => ({
      ...prevState,
      title: event.target.value,
    }));
  };

  const handleClassroomDescriptionChange = (event) => {
    setUpdatedClassroom(prevState => ({
      ...prevState,
      description: event.target.value,
    }));
  };

  const handleClassroomFileChange = (event) => {
    const file = event.target.files[0];

    if (file.size > IMAGE_MAX_SIZE) {
      setErrorFileMessage(IMAGE_SIZE_ERROR);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorFileMessage(IMAGE_EXTENSION_ERROR);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <>
      <ClassroomSaveModal
        show={ saveModalShow }/>

      { isLoading || isSorting || isCopying ? (
        <Loader title={
          (isLoading && LOADING_TEXT) ||
          (isSorting && SORTING_TEXT) ||
          (isCopying && COPYING_TEXT)
        }/>
      ) : (
        <Container className="my-3">
          <Form noValidate validated={ validated } onSubmit={ handleSubmit }>
            <h1 className="text-bg-primary text-center text-white rounded p-3 my-3 fs-4 fw-medium">
              Редактирование учебного класса
            </h1>

            <ClassroomEditInfo
              errorFileMessage={ errorFileMessage }
              setErrorFileMessage={ setErrorFileMessage }
              selectedFile={ selectedFile }
              updatedClassroom={ updatedClassroom }
              handleClassroomFileChange={ handleClassroomFileChange }
              handleClassroomDescriptionChange={ handleClassroomDescriptionChange }
              handleClassroomTitleChange={ handleClassroomTitleChange }/>

            <ClassroomEditSyllabus updatedClassroom={ updatedClassroom }
                                   setUpdatedClassroom={ setUpdatedClassroom }/>

            <SaveCancelMenu
              sortedClassroom={ sortedClassroom }
              updatedClassroom={ updatedClassroom }
              setUpdatedClassroom={ setUpdatedClassroom }
              selectedFile={ selectedFile }
              setSelectedFile={ setSelectedFile }/>
          </Form>

          <div className="my-4 border border-info border-2"/>

          <StudentZoneAccordion/>

          <DangerZoneAccordion classroom={ updatedClassroom }/>
        </Container>
      ) }
    </>
  );
};

export default ClassroomEditForm;