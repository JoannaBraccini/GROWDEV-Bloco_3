import { createBrowserRouter, RouterProvider } from "react-router";
import { Home } from "../../pages/Home";
import { ErrorPage } from "../../pages/Error";
import { Account } from "../../pages/Account";

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
    path: "*",
    element: <ErrorPage />,
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
