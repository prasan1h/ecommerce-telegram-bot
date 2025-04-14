import { useState,useEffect,React } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import "./App.css";
import "./assets/style.css";

import Listing from './pages/Listing';
import Checkout from './pages/Checkout';
import Address from './pages/Address';
import Payment from './pages/Payment';

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <><Listing/></>
    },
    {
      path:"/checkout",
      element: <><Checkout/></>
    },
    {
      path:"/address",
      element: <><Address/></>
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
