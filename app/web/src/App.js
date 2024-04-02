import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import AppRouter from "./router/AppRouter";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <NavigationBar/>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
