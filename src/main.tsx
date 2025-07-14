import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';


const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'blue',
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <Notifications position="top-right" />
          <App />
        </ModalsProvider>
      </MantineProvider>
    </Provider>
  </React.StrictMode>
)