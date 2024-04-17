import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/UI/Loader/Loader";
import { LOADING_TEXT } from "../components/UI/Loader/LoaderConstants";
import { AuthContext } from "../context/Auth/AuthContext";
import PrivateRoute from "./PrivateRoute";
import { privateRoutes, publicRoutes, testRoutes } from "./routers";

const AppRouter = () => {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <Loader title={ LOADING_TEXT }/>
    )
  }

  return (
    <Routes>
      { publicRoutes.map(route => (
        <Route path={ route.path } element={ route.element } key={ route.path }/>
      )) }

      <Route element={ <PrivateRoute/> }>
        { privateRoutes.map(route => (
          <Route path={ route.path } element={ route.element } key={ route.path }/>
        )) }
      </Route>

      { testRoutes.map(route => (
        <Route path={ route.path } element={ route.element } key={ route.path }/>
      )) }
    </Routes>
  )
};

export default AppRouter;