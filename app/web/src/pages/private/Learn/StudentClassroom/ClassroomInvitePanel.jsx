import React, { useState } from "react";
import { Button, Form, InputGroup, Stack } from "react-bootstrap";
import InviteService from "../../../../API/Invite/InviteService";
import Loader from "../../../../components/UI/Loader/Loader";
import { LOADING_TEXT } from "../../../../components/UI/Loader/LoaderConstants";
import { UUID_LENGTH, UUID_REGEX } from "../../../../constants/UtilsConstants";
import ErrorJoinClassroomAlert from "./ErrorJoinClassroomAlert";

const ClassroomInvitePanel = ({ fetchClassrooms }) => {
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inviteUuid, setInviteUuid] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitInviteJoin = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    if (form.checkValidity() === true) {
      try {
        setIsLoading(true);
        const response = await InviteService.joinClassroom(inviteUuid);
        if (response.detail) {
          setErrorMessage(response.detail);
          return;
        }
        fetchClassrooms();
        setInviteUuid("");
      } catch (error) {
        console.log("Error joining classroom", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChangeInviteForm = (event) => {
    setInviteUuid(event.target.value);
  };

  return (
    <>
      { isLoading ? (
        <Loader title={ LOADING_TEXT }/>
      ) : (
        <>
          <ErrorJoinClassroomAlert errorMessage={ errorMessage }
                                   setErrorMessage={ setErrorMessage }
                                   show={errorMessage}/>

          <div className="mt-1 mb-4">
            <Stack direction="horizontal">
              <Form.Label className="mb-0">Присоединиться к учебному классу</Form.Label>
            </Stack>
            <Form noValidate validated={ validated } onSubmit={ handleSubmitInviteJoin }>
              <InputGroup size="lg">
                <Form.Control required
                              className="border border-secondary"
                              placeholder={ "Введите uuid приглашения!" }
                              pattern={ UUID_REGEX.source }
                              minLength={ UUID_LENGTH }
                              maxLength={ UUID_LENGTH }
                              onChange={ handleChangeInviteForm }
                              value={ inviteUuid }/>
                <Button children={ "Присоединиться" }
                        className={ "btn-success" }
                        type="submit"/>
                <Form.Control.Feedback type="invalid"
                                       children={ "Приглашение должно быть в формате uuid! Попросите преподавателя им поделиться ;)" }
                                       className="mt-0"/>
              </InputGroup>
            </Form>
          </div>
        </>
      ) }
    </>
  );
};

export default ClassroomInvitePanel;