import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './main.scss' // it must be before next for correct style overriding
import App from '@components/App'
import ErrorBoundary from '@services/ErrorBoundary'
import { Provider } from 'react-redux'
import { store } from '@store/index'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)
