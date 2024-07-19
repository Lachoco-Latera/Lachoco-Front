import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Products from "./components/Products/Products.tsx";
import "./index.css";
import { Toaster } from "sonner";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Favorites from "./components/Favorites/Favorites.tsx";
import Inventory from "./components/Inventory/Inventory.tsx";

import { ClerkProvider } from "@clerk/clerk-react";
import Ship from "./components/Ship/Ship.tsx";
import { Admin } from "./components/Admin/Admin.tsx";
import Success from "./components/Success/Success.tsx";
// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products/:id",
    element: <Products />,
  },
  { path: "/favorites", element: <Favorites /> },
  { path: "/inventory", element: <Inventory /> },
  {
    path: "/ship",
    element: <Ship />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/success",
    element: <Success />,
  },
]);

const isSmallScreen = window.innerWidth < 768;

const toasterPosition = isSmallScreen ? "bottom-left" : "top-right";
const toasterDuration = isSmallScreen ? 900 : 1200;
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Toaster
        position={toasterPosition}
        duration={toasterDuration}
        richColors
      />
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
