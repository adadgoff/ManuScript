import React from "react";
import { Container } from "react-bootstrap";
import Module from "./Module";

const Modules = ({ ...props }) => {
  return (
    <Container>
      { props.modules && props.modules.map((module, index) =>
        <Module key={ module.id } number={ index + 1 } module={ module }/>
      ) }
    </Container>
  );
};

export default Modules;