import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Todo from "./pages/Todo";
import Home from "./pages/Home";

const routerData = [
  {
    id: 0,
    path: "/",
    element: <Home />,
  },
  {
    id: 1,
    path: "/signin",
    element: <Login />,
  },
  {
    id: 2,
    path: "/signup",
    element: <Signup />,
  },
  {
    id: 3,
    path: "/todo",
    element: <Todo />,
  },
];

export const routers = createBrowserRouter(
  routerData.map((router) => {
    return {
      path: router.path,
      element: router.element,
    };
  })
);
