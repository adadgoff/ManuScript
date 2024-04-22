import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Stack } from "react-bootstrap";
import InviteService from "../../../../../API/Invite/InviteService";
import Loader from "../../../../../components/UI/Loader/Loader";
import { LOADING_TEXT, SAVING_TEXT } from "../../../../../components/UI/Loader/LoaderConstants";
import { useFetching } from "../../../../../hooks/useFetching";

const ClassroomInvitePanel = ({ classroom }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [invite, setInvite] = useState({});

  const [fetchInvite, isFetchingLoading, fetchingError] = useFetching(
    async () => {
      const invite = await InviteService.getInvite(classroom.id);
      setInvite(invite);
    }
  );

  useEffect(() => {
    fetchInvite();
  }, []);

  const handleCreateInviteBtn = async () => {
    try {
      setIsLoading(true);
      const response = await InviteService.createInvite(classroom.id);
      if (response.detail) {
        return;
      }
      setInvite(response);
    } catch (error) {
      console.log("Error creating invite", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateInviteBtn = async () => {
    try {
      setIsLoading(true);
      const response = await InviteService.updateInvite(classroom.id);
      if (response.detail) {
        return;
      }
      setInvite(response);
    } catch (error) {
      console.log("Error updating invite", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteInviteBtn = async () => {
    try {
      setIsLoading(true);
      const response = await InviteService.deleteInvite(classroom.id);
      if (response.detail) {
        return;
      }
      setInvite({});
    } catch (error) {
      console.log("Error deleting invite", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      { isFetchingLoading || isLoading ? (
        <Loader title={
          (isFetchingLoading && LOADING_TEXT) ||
          (isLoading && SAVING_TEXT)
        }/>
      ) : (
        <div className="mt-3 mb-4">
          <Stack direction="horizontal">
            <Form.Label className="mb-0">Приглашение в учебный класс</Form.Label>
          </Stack>
          <InputGroup>
            <Form.Control readOnly
                          className="border border-secondary"
                          placeholder={ "Создайте приглашение в учебный класс!" }
                          value={ invite.uuid ? invite.uuid : undefined }/>

            { invite.uuid ? (
              <>
                <Button children={ "Обновить" }
                        className={ "btn-primary" }
                        onClick={ handleUpdateInviteBtn }/>
                <Button children={ "Удалить" }
                        className={ "btn-danger" }
                        onClick={ handleDeleteInviteBtn }/>
              </>
            ) : (
              <>
                <Button children={ "Создать" }
                        className={ "btn-success" }
                        onClick={ handleCreateInviteBtn }/>
              </>
            ) }
          </InputGroup>
        </div>
      ) }
    </>
  );
};

export default ClassroomInvitePanel;