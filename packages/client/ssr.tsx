import App from './src/components/App/App'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'

// tmp
import { createSSRStore } from './src/store/ssr-store'
const store = createSSRStore()

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  )
}
