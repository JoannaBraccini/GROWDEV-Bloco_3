import { createBrowserRouter, Navigate } from "react-router";
import { Login } from "../../pages/Login";
import { RouterProvider } from "react-router-dom";
import { Assessments } from "../../pages/Assessments";
import { DefaultLayout } from "../layout/DefaultLayout";
import { Signup } from "../../pages/Signup";
import { Home } from "../../pages/Home";
import { Students } from "../../pages/Students";
import { Profile } from "../../pages/Profile";
import { Details } from "../../pages/Details";

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
    path: "/profile/:id",
    element: <DefaultLayout children={<Profile />} />,
  },
  {
    path: "/students",
    element: <DefaultLayout children={<Students />} />,
  },
  {
    path: "/assessments",
    element: <DefaultLayout children={<Assessments />} />,
  },
  {
    path: "/details/:id",
    element: <DefaultLayout children={<Details />} />,
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
