import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import GlobalStyle from './styles/globalStyle'
import { Global } from '@emotion/react'
import { AlertContextProvider } from './contexts/AlertContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthGuard from './components/auth/AuthGuard'
import { RecoilRoot } from 'recoil'

const queryClient = new QueryClient({ defaultOptions: {} })

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Global styles={GlobalStyle} />
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AlertContextProvider>
          <AuthGuard>
            <App />
          </AuthGuard>
        </AlertContextProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()