import { createBrowserRouter, Navigate } from "react-router";
import { Login } from "../../pages/Login";
import { RouterProvider } from "react-router-dom";
import { Assessments } from "../../pages/Assessments";
import { DefaultLayout } from "../layout/DefaultLayout";
import { Detail } from "../../pages/Detail";
import { Signup } from "../../pages/Signup";
import { Home } from "../../pages/Home";
import { Students } from "../../pages/Students";

// Definição das rotas
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/home",
    element: <DefaultLayout children={<Home />} />,
  },
  {
    path: "/assessments",
    element: <DefaultLayout children={<Assessments />} />,
  },
  {
    path: "/students",
    element: <DefaultLayout children={<Students />} />,
  },
  {
    path: "/detail",
    element: <DefaultLayout children={<Detail />} />,
  },

  {
    path: "/",
    element: <Navigate to="/login" />,
  },
]);

// Prover essa rotas
export function AppRoutes() {
  return <RouterProvider router={router} />;
}
