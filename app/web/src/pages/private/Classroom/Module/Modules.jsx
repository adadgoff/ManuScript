import React from "react";
import Module from "./Module";

const Modules = ({ ...props }) => {
  return (
    <>
      { props.modules && props.modules.map(module =>
        <Module key={ module.id } module={ module }/>
      ) }
    </>
  );
};

export default Modules;