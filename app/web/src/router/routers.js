import Learn from "../pages/private/Learn/Learn";
import Teach from "../pages/private/Teach/Teach";
import About from "../pages/public/About/About";
import Error from "../pages/public/Error/Error";
import Login from "../pages/public/Login/Login";
import Register from "../pages/public/Register/Register";
import Test from "../pages/public/Test/Test";

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

export const testRoutes = [
  { path: "/test", element: <Test/> }
]
