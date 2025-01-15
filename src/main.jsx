import * as React from "react";
import * as ReactDOM from "react-dom/client";

import ThemeProvider from "./assets/provider/ThemeProvider";
import CartProvider from "./assets/provider/CartProvider";

import "./index.css";

// Import Pages
import LayoutSite from "./LayoutSite";
import Home from "./assets/pages/Home";
import Story from "./assets/pages/Story";
import Tours from "./assets/pages/Tours";
import Shop from "./assets/pages/Shop";
import Contact from "./assets/pages/Contact";
import Cart from "./assets/pages/Cart";
import Prodotto from "./assets/pages/Prodotto";
import Checkout from "./assets/pages/Checkout";
import Operation from "./assets/pages/Operation";

// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// ChakraUI
import { ChakraProvider } from "@chakra-ui/react";

// NextUI
import { NextUIProvider } from "@nextui-org/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutSite />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/story",
        element: <Story />,
      },
      {
        path: "/tours",
        element: <Tours />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/shop/:id",
        element: <Prodotto />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/checkout/operation",
    element: <Operation />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <ThemeProvider>
        <NextUIProvider>
          <ChakraProvider>
            <RouterProvider router={router} />
          </ChakraProvider>
        </NextUIProvider>
      </ThemeProvider>
    </CartProvider>
  </React.StrictMode>
);