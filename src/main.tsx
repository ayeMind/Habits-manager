import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { MantineProvider } from '@mantine/core';



import 'app/global.css';
import '@mantine/core/styles.css';

import Home from 'pages/home/Home.tsx';
import NotFound from 'pages/not-found/NotFound';
import Library from 'pages/Library/Library';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/Home/",
    element: <Home />,
  },
  {
    path: "/library/",
    element: <Library />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme='dark'>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>,
)
