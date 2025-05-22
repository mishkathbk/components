import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { rooter } from "./router/Router";
import "./styles/css/style.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
     <RouterProvider router={rooter} />
  </React.StrictMode>
);
