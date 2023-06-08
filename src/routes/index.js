import React from "react";
import { useRoutes } from "react-router-dom";
import Layout from "../layout";
import { Contract, Earn, Refer } from "../pages";

export const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Refer />,
        },
        {
          path: "/refer-earn",
          element: <Earn />,
        },
        {
          path: "/contract",
          element: <Contract />,
        },
      ],
    },
  ]);
};
