import React from 'react'
import ReactDOM from 'react-dom/client'
import { Notifications } from 'react-push-notification';

import ThemeProvider from 'app/ThemeProvider';

import 'app/global.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/code-highlight/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Notifications position='bottom-right' />
    <ThemeProvider />
  </React.StrictMode>,
)
