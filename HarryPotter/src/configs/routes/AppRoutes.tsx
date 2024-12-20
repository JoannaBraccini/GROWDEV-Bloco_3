import { createBrowserRouter, RouterProvider } from "react-router";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { Home } from "../../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout children={<Home />} />,
  },
  {
    path: "*",
    element: <h1>Not found</h1>,
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
