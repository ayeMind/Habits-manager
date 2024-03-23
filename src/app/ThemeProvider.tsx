import Router from "./RouterProvider";
import { MantineProvider, createTheme } from "@mantine/core";
import { useGlobalStore } from "./globalStore";
import { getTheme } from "src/shared/themes";
import { useEffect, useState } from "react";

type theme = 'light' | 'dark';

const ThemeProvider = () => {

  const getColorScheme = (theme: string) => {
    if (theme === 'light') {
      return 'light'
    } else {
      return 'dark'
    }
  }

  const color = useGlobalStore((state) => state.theme);
  const [theme, setTheme] = useState(getTheme(color));
  const [colorScheme, setColorScheme] = useState<theme>(getColorScheme(color))

  const themeColors = (theme === 'light' || theme === 'standard') ? {} : {
    dark: theme,
  }

  useEffect(() => {
    setTheme(getTheme(color));
    setColorScheme(getColorScheme(color));
  }, [color]);


  const darkTheme = createTheme({
    breakpoints: {
      xxs: '24em',
      xs: '36em',
      sm: '48em',
      md: '62em',
      lg: '75em',
      xl: '88em',
      xxl: '120em',
      xxxl: '160em',
    },

    colors: themeColors
  });

  return (
    <>
       <MantineProvider forceColorScheme={colorScheme} theme={darkTheme}>
            <Router />
        </MantineProvider>
    </>
  );
};

export default ThemeProvider;