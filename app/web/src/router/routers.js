import Classroom from "../pages/private/Classroom/Classroom";
import ClassroomEdit from "../pages/private/ClassroomEdit/ClassroomEdit";
import Learn from "../pages/private/Learn/Learn";
import Lesson from "../pages/private/Lesson/Lesson";
import LessonEdit from "../pages/private/LessonEdit/LessonEdit";
import Teach from "../pages/private/Teach/Teach";
import About from "../pages/public/About/About";
import Error from "../pages/public/Error/Error";
import Login from "../pages/public/Login/Login";
import Register from "../pages/public/Register/Register";
import Test from "../pages/test/Test";

export const privateRoutes = [
  { path: "/learn", element: <Learn/> },
  { path: "/teach", element: <Teach/> },
  { path: "/classroom/:id", element: <Classroom/> },
  { path: "/classroom/:id/edit", element: <ClassroomEdit/> },
  { path: "/lesson/:id", element: <Lesson/> },
  { path: "/lesson/:id/edit", element: <LessonEdit/> },
]

export const publicRoutes = [
  { path: "/about", element: <About/> },
  { path: "/login", element: <Login/> },
  { path: "/register", element: <Register/> },
  { path: "/*", element: <Error/> },
]

export const testRoutes = [
  { path: "/test", element: <Test/> },
]
