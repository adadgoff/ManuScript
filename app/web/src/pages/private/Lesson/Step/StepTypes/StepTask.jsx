import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import UserStepService from "../../../../../API/UserStep/UserStepService";
import Loader from "../../../../../components/UI/Loader/Loader";
import { LOADING_TEXT } from "../../../../../components/UI/Loader/LoaderConstants";
import { useFetching } from "../../../../../hooks/useFetching";
import ImageAccordion from "../components/ImageAccordion";
import SizeErrorAlert from "../components/SizeErrorAlert";
import StatusAlert from "../components/StatusAlert";
import StepText from "../components/StepText";
import StepType from "../components/StepType";

const StepTask = ({ ...props }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [sizeError, setSizeError] = useState(false);

  const [userStep, setUserStep] = useState(null);
  const [fetchUserStep, isFetchingLoading, fetchingError] = useFetching(async () => {
    const userStep = await UserStepService.getUserStep(props.step.id);
    setUserStep(userStep);
    setUserAnswer(userStep.user_answer ? userStep.user_answer : "");
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUserStep();
  }, []);

  const handlerFormSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile.size > 5 * 1024 * 1024) {
      setSizeError(true);
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
  }

  return (
    <Form onSubmit={ handlerFormSubmit }>
      <StepType step={ props.step }/>
      <StepText step={ props.step }/>

      { sizeError && <SizeErrorAlert setSizeError={ setSizeError }/> }

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
                setSizeError(false);
              } }
            />

            <Form.Label className="mt-2">Введите ответ</Form.Label>
            <Form.Control
              type="text"
              value={ userAnswer }
              onChange={ event => setUserAnswer(event.target.value) }
            />

            <Button
              type="submit"
              className="btn-success w-100 my-3"
              children="Ответить"
              disabled={ selectedFile === null || sizeError === true || userAnswer.length <= 0 }
            />

            { !userStep.detail && <ImageAccordion userStep={ userStep }/> }
          </Form.Group>
        </>
      ) }

    </Form>
  );
};

export default StepTask;