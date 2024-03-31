import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "../components/UI/Loader/Loader";
import { AuthContext } from "../context/AuthContext";
import About from "../pages/About/About";
import Error from "../pages/Error/Error";
import StudentClassrooms from "../pages/StudentClassrooms/StudentClassrooms";

const AppRouter = () => {
  const { token, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader/>
  }

  return (
    token
      ?
      // private routes.
      <Routes>

      </Routes>
      :
      // public routes.
      <Routes>
        {/* TODO: how to fix? */ }
        {/* publicRoutes.map(route =>*/ }
        {/*  <Route  { ...route }/>) }*/ }
        <Route path="/about" element={ <About/> }/>
        <Route path="/student-classrooms" element={ <StudentClassrooms/> }/>
        <Route path="/error" element={ <Error/> }/>
        <Route path="/*" element={<Navigate to="/error"/>}/>
      </Routes>
  )
};

export default AppRouter;