import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/Auth/AuthContext";

const PrivateRoute = () => {
  const { token } = useContext(AuthContext);

  return (
    token ? <Outlet/> : <Navigate to="login" replace={ true }/>
  );
};

export default PrivateRoute;