import { useState,useEffect,React } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import "./App.css";
import "./assets/style.css";

import Listing from './pages/Listing';
import Checkout from './pages/Checkout';
import Add from './pages/AddList';
import ShowList from "./pages/ShowList";
import ReadOrder from "./pages/ReadOrder";
import Notify from "./pages/Notify";

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element: <Navigate to="/home" />
    },
    {
      path:"/home",
      element: <><ShowList/></>
    },
    {
      path:"/checkout",
      element: <><Checkout/></>
    },
    {
      path:"/add",
      element: <><Add/></>
    },
    {
      path:"/list",
      element: <><Listing/></>
    },
    {
      path : "/notify",
      element: <> <Notify/> </>
    },
    {
      path : "/readorder",
      element: <> <ReadOrder/> </>
    }
  ])

  return (
      <RouterProvider router={router} />
  );
}

export default App;
