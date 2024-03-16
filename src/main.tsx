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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>,
)
