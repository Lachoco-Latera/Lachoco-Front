import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Products from "./components/Products/Products.tsx";
import "./index.css";
import { Toaster } from "sonner";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Favorites from "./components/Favorites/Favorites.tsx";
import Inventory from "./components/Inventory/Inventory.tsx";
import { LanguageProvider } from "./hooks/LanguageContext.tsx";

import { ClerkProvider } from "@clerk/clerk-react";
import Ship from "./components/Ship/Ship.tsx";
import { Admin } from "./components/Admin/Admin.tsx";
import Success from "./components/Success/Success.tsx";
import Failure from "./components/Failure/Failure.tsx";
import { GiftCards } from "./components/GiftCards/GiftCards.tsx";
import "./locales/i18n.ts"
import { DatosEmpresa } from "./components/Footer/DatosEmpresa.tsx";
import { PoliticaPrivacidad } from "./components/Footer/PoliticaPrivacidad.tsx";
import AuthGuard from "./guards/authGuard.tsx";
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
    element:( 
      <AuthGuard>
        <Admin />
      </AuthGuard>
  ),
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/failure",
    element: <Failure />,
  },
  {
    path: "/gift-cards",
    element: <GiftCards />,
  },
  {
    path: "/company-info",
    element: <DatosEmpresa />,
  },
  {
    path: "/privacy-policy",
    element: <PoliticaPrivacidad />,
  }
]);

const isSmallScreen = window.innerWidth < 768;

const toasterPosition = isSmallScreen ? "bottom-left" : "top-right";
const toasterDuration = isSmallScreen ? 900 : 1200;
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <LanguageProvider>
      <RouterProvider router={router} />
      <Toaster
        position={toasterPosition}
        duration={toasterDuration}
        richColors
        />
        </LanguageProvider>
    </ClerkProvider>
  </React.StrictMode>
);
