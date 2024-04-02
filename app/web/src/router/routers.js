import About from "../pages/About/About";
import Error from "../pages/Error/Error";
import Learn from "../pages/Learn/Learn";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Teach from "../pages/Teach/Teach";

export const privateRoutes = [
  { path: "/learn", element: <Learn/> },
  { path: "/teach", element: <Teach/> },
]

export const publicRoutes = [
  { path: "/about", element: <About/> },
  { path: "/login", element: <Login/> },
  { path: "/register", element: <Register/> },
  { path: "/*", element: <Error/> },
]