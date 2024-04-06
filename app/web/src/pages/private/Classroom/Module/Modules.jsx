import React from "react";
import { Container } from "react-bootstrap";
import Module from "./Module";

const Modules = ({ ...props }) => {
  return (
    <Container>
      { props.modules && props.modules.map(module =>
        <Module key={ module.id } module={ module }/>
      ) }
    </Container>
  );
};

export default Modules;