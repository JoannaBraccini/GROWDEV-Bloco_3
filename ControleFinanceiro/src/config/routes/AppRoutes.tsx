import { createBrowserRouter, RouterProvider } from "react-router";
import { Login } from "../../pages/Login";
import { ErrorPage } from "../../pages/Error";
import { Account } from "../../pages/Account";
import { Home } from "../../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/conta",
    element: <Account />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
