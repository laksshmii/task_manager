
import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App'
import { ThemeProvider } from './ThemeContext'

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'blue',
  colors: {
    dark: [
      '#000000',
      '#000000',
      '#000000',
      '#000000',
      '#000000',
      '#000000',
      '#000000',
      '#000000',
      '#000000',
      '#000000',
    ],
    gray: [
      '#f8fafc',
      '#f1f5f9',
      '#e2e8f0',
      '#cbd5e1',
      '#94a3b8',
      '#64748b',
      '#475569',
      '#334155',
      '#1e293b',
      '#0f172a',
    ]
  }

})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <MantineProvider theme={theme}>
          <ModalsProvider>
            <Notifications position="top-right" />
            <App />
          </ModalsProvider>
        </MantineProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)