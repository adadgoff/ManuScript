import { createContext, useContext, useState } from "react";

const UpdatedClassroomContext = createContext();

export const useUpdatedClassroomContext = () => useContext(UpdatedClassroomContext);

export const UpdatedClassroomProvider = ({ children }) => {
  const [updatedClassroom, setUpdatedClassroom] = useState(null);

  return (
    <UpdatedClassroomContext.Provider value={ { updatedClassroom, setUpdatedClassroom } }>
      { children }
    </UpdatedClassroomContext.Provider>
  );
};
