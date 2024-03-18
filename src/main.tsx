import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { createTheme, MantineProvider } from '@mantine/core';



import 'app/global.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import Home from 'pages/home/Home.tsx';
import NotFound from 'pages/not-found/NotFound';
import Library from 'pages/Library/Library';
import Statistics from 'pages/Statistics/Statistics';
import Store from 'pages/Store/Store';
import Themes from 'pages/Themes/Themes';

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
  },
  {
    path: "/statistics/",
    element: <Statistics />,
  },
  {
    path: "/store/",
    element: <Store />,
  },
  {
    path: "/themes/",
    element: <Themes />,
  },
]);


const theme = createTheme({
  breakpoints: {
    xs: '36em',
    sm: '48em',
    md: '62em',
    lg: '75em',
    xl: '88em',
    xxl: '120em',
    xxxl: '160em',
  },
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme='dark' theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>,
)
