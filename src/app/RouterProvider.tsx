import { RouterProvider, createBrowserRouter } from "react-router-dom";


import Home from 'pages/Home/Home';
import NotFound from 'pages/Not-found/NotFound';
import Library from 'pages/Library/Library';
import Statistics from 'pages/Statistics/Statistics';
import Store from 'pages/Store/Store';
import Themes from 'pages/Themes/Themes';
import Settings from 'pages/Settings/Settings';
import Formats from 'pages/Formats/Formats';

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
    {
      path: "/settings/",
      element: <Settings />,
    },
    {
      path: "/formats/",
      element: <Formats />,
    },
  ]);


const Router = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default Router;