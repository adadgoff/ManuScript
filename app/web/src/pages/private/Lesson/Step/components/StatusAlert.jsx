import React from "react";
import { Alert } from "react-bootstrap";
import { USER_STEP_STATUS_CORRECT, USER_STEP_STATUS_INCORRECT, USER_STEP_STATUS_NULL } from "./constants";

const StatusAlert = ({ ...props }) => {
  const variant = !props.userStep.detail
    ? props.userStep.status === "CORRECT"
      ? "success"
      : "danger"
    : "secondary";

  const message = !props.userStep.detail ?
    props.userStep.status === "CORRECT"
      ? USER_STEP_STATUS_CORRECT
      : USER_STEP_STATUS_INCORRECT
    : USER_STEP_STATUS_NULL;

  return (
    <Alert variant={ variant } className="mt-3">
      <p className="mb-0">{ message }</p>
    </Alert>
  );
};

export default StatusAlert;