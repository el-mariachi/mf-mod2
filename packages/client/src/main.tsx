import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './main.scss' // it must be before App for correct style overriding
import App from '@components/App'
import ErrorBoundary from '@services/ErrorBoundary'
import { SSRProvider } from 'react-bootstrap'
import { Provider } from 'react-redux'
import startServiceWorker from '@services/ServiceWorkers/swStart'

import { store } from '@store/index'
delete window.__PRELOADED_STATE__

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
)

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  RENDERED_ON_SERVER ? <SSRProvider>{app}</SSRProvider> : app
)

startServiceWorker({ always: false })
