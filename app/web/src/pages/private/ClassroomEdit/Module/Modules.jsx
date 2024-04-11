import React from "react";
import Module from "./Module";

const Modules = ({ modules, updatedClassroom, setUpdatedClassroom }) => {
  return (
    <>
      { modules && modules.map((module, index) => (
        <>
          <Module
            key={ module.id }
            module={ module }
            updatedClassroom={ updatedClassroom }
            setUpdatedClassroom={ setUpdatedClassroom }
          />
          { index !== modules.length - 1 && <div className="my-4 border border-2"/> }
        </>
      )) }
    </>
  );
};

export default Modules;