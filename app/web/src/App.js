import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { AuthContext } from "./context/Auth/AuthContext";
import AppRouter from "./router/AppRouter";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setToken(localStorage.getItem("access_token"))
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={ { token, setToken, isLoading } }>
      <BrowserRouter>
        <NavigationBar/>
        <AppRouter/>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
