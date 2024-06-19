import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Products from "./components/Products/Products.tsx";
import "./index.css";
import { Toaster } from "sonner";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products",
    element: <Products />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster position="top-right" duration={1200} />
    <RouterProvider router={router} />
  </React.StrictMode>
);
