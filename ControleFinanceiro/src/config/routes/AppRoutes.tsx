import { createBrowserRouter, RouterProvider } from "react-router";
import { Login } from "../../pages/Login";
import { ErrorPage } from "../../pages/Error";
import { Profile } from "../../pages/Profile";
import { Home } from "../../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/perfil",
    element: <Profile />,
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
