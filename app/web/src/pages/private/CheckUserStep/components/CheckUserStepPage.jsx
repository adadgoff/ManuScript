import React from "react";
import { Accordion, Container } from "react-bootstrap";
import StepText from "../../Lesson/Step/components/StepText";
import ProfileInfo from "../../Profile/components/ProfileInfo";
import UserStepAnswerPanel from "./UserStepAnswerPanel";
import UserStepChangePanel from "./UserStepChangePanel";

const CheckUserStepPage = ({ userStep, step, user, setUserStep }) => {
  return (
    <Container>
      <h1 className="text-bg-primary text-center text-white rounded p-3 my-3 fs-4 fw-medium">
        Просмотр работы учащегося
      </h1>

      <h5 className="text-center border border-primary align-content-center rounded p-2 my-3">
        Информация об учащемся
      </h5>
      <ProfileInfo user={ user }/>

      <Accordion className="border border-primary rounded my-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Условие задания</Accordion.Header>
          <Accordion.Body>
            <StepText step={ step }/>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <UserStepAnswerPanel step={ step } userStep={ userStep }/>
      <UserStepChangePanel step={ step } user={ user } userStep={ userStep }
                           setUserStep={ setUserStep }/>

    </Container>
  );
};

export default CheckUserStepPage;