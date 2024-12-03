import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DefaultLayout } from "../layout/DefaultLayout";
import { Home } from "../../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout children={<Home />} />,
  },
  {
    path: "*",
    element: <h1>404!</h1>,
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
