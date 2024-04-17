import React from "react";
import { Accordion } from "react-bootstrap";
import ProfileEditForm from "./ProfileEditForm";

const ProfileEdit = ({ updatedUser, setUpdatedUser, setAuthUser }) => {
  return (
    <Accordion>
      <Accordion.Item eventKey="1" className="border border-info">
        <Accordion.Header>
          <span className="fw-medium">Редактировать профиль</span>
        </Accordion.Header>
        <Accordion.Body className="pt-2 pb-4">
          <ProfileEditForm updatedUser={ updatedUser }
                           setUpdatedUser={ setUpdatedUser }
                           setAuthUser={ setAuthUser }/>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ProfileEdit;