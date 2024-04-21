import React from "react";
import { Container } from "react-bootstrap";
import StepText from "../../Lesson/Step/components/StepText";
import StepAnswer from "./StepAnswer";

const StepPage = ({ step }) => {
  return (
    <Container className="my-3">
      <h1 className="text-bg-primary text-center text-white rounded p-3 my-3 fs-4 fw-medium">
        Просмотр задания
      </h1>

      <h5 className="text-center border border-primary align-content-center rounded p-2 my-3">
        Условие задания
      </h5>
      <StepText step={ step }/>
      <StepAnswer step={ step }/>
    </Container>
  );
};

export default StepPage;