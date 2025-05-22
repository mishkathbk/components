import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../components/Home";
import CustomerPage from "@/modules/sales/customer/pages/CustomerPage";
import CustomerAdd from "@/modules/sales/customer/pages/CustomerAdd";

export const rooter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>Something went wrong</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/customer",
        element: <CustomerPage />,
      },
      {
        path: "/customer-add",
        element: <CustomerAdd />,
      },
    ],
  },
]);
