import { Navigate } from "react-router-dom";
import Check from "../pages/private/Check/Check";
import CheckUserStep from "../pages/private/CheckUserStep/CheckUserStep";
import Classroom from "../pages/private/Classroom/Classroom";
import ClassroomEdit from "../pages/private/ClassroomEdit/ClassroomEdit";
import Learn from "../pages/private/Learn/Learn";
import Lesson from "../pages/private/Lesson/Lesson";
import LessonEdit from "../pages/private/LessonEdit/LessonEdit";
import Profile from "../pages/private/Profile/Profile";
import Step from "../pages/private/Step/Step";
import Teach from "../pages/private/Teach/Teach";
import User from "../pages/private/User/User";
import About from "../pages/public/About/About";
import Error from "../pages/public/Error/Error";
import Login from "../pages/public/Login/Login";
import Register from "../pages/public/Register/Register";
import Test from "../pages/test/Test";

export const privateRoutes = [
  { path: "/", element: <Navigate to="/learn"/> },

  { path: "/learn", element: <Learn/> },
  { path: "/teach", element: <Teach/> },

  { path: "/classroom/:id", element: <Classroom/> },
  { path: "/classroom/:id/edit", element: <ClassroomEdit/> },

  { path: "/classroom/:id/check", element: <Check/> },
  { path: "/classroom/:id/check/:id/:uuid", element: <CheckUserStep/> },

  { path: "/lesson/:id", element: <Lesson/> },
  { path: "/lesson/:id/edit", element: <LessonEdit/> },

  { path: "/step/:id", element: <Step/> },

  { path: "/profile", element: <Profile/> },
  { path: "/user/:uuid", element: <User/> },

  { path: "/*", element: <Error/> },
]

export const publicRoutes = [
  { path: "/about", element: <About/> },
  { path: "/login", element: <Login/> },
  { path: "/register", element: <Register/> },
]

export const testRoutes = [
  { path: "/test", element: <Test/> },
]
