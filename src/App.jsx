import { useState,useEffect,React } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import "./App.css";
import "./assets/style.css";

import Listing from './pages/Listing';
import Checkout from './pages/Checkout';
import Add from './pages/AddList';
import Payment from './pages/Payment';
import About from "./pages/About"
import ShowList from "./pages/ShowList";
import Img from './pages/img';
import ReadOrder from "./pages/ReadOrder";

function App() {

  // navigate = Navigate();
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
      path:"/about",
      element: <><About/></>
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
      path : "/show",
      element: <> <ShowList/> </>
    },
    {
      path : "/img",
      element: <> <Img/> </>
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
