import App from './src/components/App/App'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'
import { createSSRStore } from './src/store/ssr-store'
const store = createSSRStore()

export function render(url: string) {
  const reactHtml = renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  )
  const injectStoreScript = `
  <script>
  window.__PRELOADED_STATE__=${JSON.stringify(store.getState()).replace(
    /</g,
    '\\u003c'
  )}
  </script>`
  return `<div id="root">${reactHtml}</div>${injectStoreScript}`
}
