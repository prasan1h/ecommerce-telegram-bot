import { useState,useEffect,React } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import "./App.css";
import "./assets/style.css";

import Listing from './pages/Listing';
import Checkout from './pages/Checkout';
import Add from './pages/AddList';
import Payment from './pages/Payment';
import About from "./pages/About"

function App() {

  // navigate = Navigate();
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Navigate to="/home" />
    },
    {
      path:"/home",
      element: <><Listing/></>
    },
    {
      path:"/checkout",
      element: <><Checkout/></>
    },
    {
      path:"/about",
      element: <><About/></>
    },
    {
      path:"/add",
      element: <><Add/></>
    },
    {
      path:"/payment",
      element: <><Payment/></>
    }
  ])

  return (
      <RouterProvider router={router} />
  );
}

export default App;
