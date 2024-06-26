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

const isSmallScreen = window.innerWidth < 768;

const toasterPosition = isSmallScreen ? "bottom-left" : "top-right";
const toasterDuration = isSmallScreen ? 900 : 1200;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster position={toasterPosition} duration={toasterDuration} richColors />
    <RouterProvider router={router} />
  </React.StrictMode>
);
