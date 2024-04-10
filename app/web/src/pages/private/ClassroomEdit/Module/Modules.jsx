import React from "react";
import Module from "./Module";

const Modules = ({ modules, updatedClassroom, setUpdatedClassroom }) => {
  return (
    <>
      { modules && modules.map(module =>
        <Module module={ module }
                updatedClassroom={ updatedClassroom }
                setUpdatedClassroom={ setUpdatedClassroom }/>
      ) }
    </>
  );
};

export default Modules;