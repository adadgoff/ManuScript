import React from "react";
import Module from "./Module";

const Modules = ({ modules, updatedClassroom, setUpdatedClassroom }) => {
  return (
    <div>
      { modules && modules.length ? (
        modules.map((module, index) => (
          <>
            <Module
              module={ module }
              updatedClassroom={ updatedClassroom }
              setUpdatedClassroom={ setUpdatedClassroom }/>
            { index !== modules.length - 1 && <div className="my-4 border border-warning border-2"/> }
          </>
        ))
      ) : (
        <h5 className="text-center bg-info-subtle border border-primary-subtle border-2 rounded p-3 mx-2 mt-4">Модулей в учебном классе нет...</h5>
      ) }
    </div>
  );
};

export default Modules;