import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import UserStepService from "../../../../../API/UserStep/UserStepService";
import Loader from "../../../../../components/UI/Loader/Loader";
import { LOADING_TEXT } from "../../../../../components/UI/Loader/LoaderConstants";
import { IMAGE_EXTENSION_ERROR, IMAGE_SIZE_ERROR } from "../../../../../constants/Error/ErrorConstants";
import { IMAGE_MAX_SIZE } from "../../../../../constants/Image/ImageConstants";
import { STEP_MAX_ANSWER_LENGTH } from "../../../../../constants/Steps/StepConstants";
import { useFetching } from "../../../../../hooks/useFetching";
import ErrorFileAlert from "../components/ErrorFileAlert";
import ImageAccordion from "../components/ImageAccordion";
import StatusAlert from "../components/StatusAlert";
import StepText from "../components/StepText";
import StepType from "../components/StepType";

const StepTaskForm = ({ ...props }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorFileMessage, setErrorFileMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [userStep, setUserStep] = useState(null);
  const [fetchUserStep, isFetchingLoading, fetchingError] = useFetching(async () => {
    const userStep = await UserStepService.getMyAnswer(props.step.id);
    setUserStep(userStep);
    setUserAnswer(userStep.user_answer ? userStep.user_answer : "");
  });

  useEffect(() => {
    fetchUserStep();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile.size > IMAGE_MAX_SIZE) {
      setErrorFileMessage(IMAGE_SIZE_ERROR);
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setErrorFileMessage(IMAGE_EXTENSION_ERROR);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await UserStepService.postAnswer(props.step.id, userAnswer, selectedFile,);
      console.log("Success uploading file", response);
      setUserStep(response);
      setUserAnswer(response.user_answer);
    } catch (error) {
      console.log("Error uploading file", error);
    } finally {
      setIsSubmitting(false);
      setSelectedFile(null);
    }
  };

  return (
    <Form onSubmit={ handleFormSubmit }>
      <StepType step={ props.step }/>
      <StepText step={ props.step }/>

      { errorFileMessage && <ErrorFileAlert errorFileMessage={ errorFileMessage }
                                            setErrorFileMessage={ setErrorFileMessage }/> }

      { isFetchingLoading || isSubmitting ? (
        <Loader title={ LOADING_TEXT }/>
      ) : (
        <>
          <StatusAlert userStep={ userStep }/>
          <Form.Group
            controlId="formFile"
            className="my-3 border border-info rounded p-3"
          >
            <Form.Label>Прикрепите файл (макс. 5 MB)</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={ event => {
                setSelectedFile(event.target.files[0]);
                setErrorFileMessage("");
              } }
            />

            <Form.Label className="mt-2">Введите ответ</Form.Label>
            <Form.Control
              type="text"
              value={ userAnswer }
              onChange={ event => setUserAnswer(event.target.value) }
              minLength={ 1 }
              maxLength={ STEP_MAX_ANSWER_LENGTH }
              required
            />

            <Button
              type="submit"
              className="btn-success w-100 my-3"
              children="Ответить"
              disabled={ selectedFile === null || errorFileMessage || userAnswer.length <= 0 }
            />

            { !userStep.detail && <ImageAccordion userStep={ userStep }/> }
          </Form.Group>
        </>
      ) }

    </Form>
  );
};

export default StepTaskForm;