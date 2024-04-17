import React from "react";
import { Modal } from "react-bootstrap";
import Loader from "../../../../components/UI/Loader/Loader";
import { SAVING_TEXT } from "../../../../components/UI/Loader/LoaderConstants";

const ProfileSavingModal = (props) => {
  return (
    <Modal { ...props }
           size="lg"
           aria-labelledby="contained-modal-title-vcenter"
           centered>
      <Modal.Body className="mb-0 pb-0">
        <Loader title={ SAVING_TEXT }/>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileSavingModal;