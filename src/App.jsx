import { useState,useEffect,React } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import "./App.css";
import "./assets/style.css";

import Listing from './pages/Listing';

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <><Listing/></>
    },
    {
      path:"/checkout",
      element: <><Listing/></>
    },
    {
      path:"/adddress",
      element: <><Listing/></>
    },
    {
      path:"/payment",
      element: <><Listing/></>
    }
  ])

  return (
      <RouterProvider router={router} />
  );
}

export default App;
