import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Sign } from "../../pages/Sign";
import { Home } from "../../pages/Home";

const router = createBrowserRouter([
  { path: "/", element: (<Sign />) as React.ReactNode },
  { path: "home", element: (<Home />) as React.ReactNode },
  { path: "*", element: (<Navigate to={"/"} />) as React.ReactNode },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;
