import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import "./styles/App.module.css";
import { AuthContext } from "./context/AuthContext";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <AuthContext.Provider value={ {} }>
      <BrowserRouter>
        <NavigationBar/>
        <AppRouter/>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
