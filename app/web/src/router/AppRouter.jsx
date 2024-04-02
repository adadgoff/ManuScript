import React from "react";
import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routers";

const AppRouter = () => {
  return (
    <Routes>
      {
        publicRoutes.map(route =>
          <Route path={ route.path } element={ route.element } key={ route.path }/>
        )
      }

      {
        privateRoutes.map(route =>
          <Route path={ route.path } element={ route.element } key={ route.path }/>
        )
      }
    </Routes>
  )
};

export default AppRouter;