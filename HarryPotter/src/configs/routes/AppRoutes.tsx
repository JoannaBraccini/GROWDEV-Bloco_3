import { createBrowserRouter } from "react-router";
import { Home } from "../../pages/Home";
import { RouterProvider } from "react-router";
import { DefaultLayout } from "../layouts/DefaultLayout";

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
