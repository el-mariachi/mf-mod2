import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './main.scss' // it must be before App for correct style overriding
import App from '@components/App/App'
import ErrorBoundary from '@services/ErrorBoundary'
import { Provider } from 'react-redux'
import { createSSRStore } from '@store/ssr-store'
import startServiceWorker from '@services/ServiceWorkers/swStart'

const store = createSSRStore(window.__PRELOADED_STATE__)
delete window.__PRELOADED_STATE__

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
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

// TODO need to fix in TS-125
// startServiceWorker({ always: false })
