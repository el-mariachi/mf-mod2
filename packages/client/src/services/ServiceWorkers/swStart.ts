function startServiceWorker({ always }: { always: boolean }) {
  const isDev = process.env.NODE_ENV === 'development'
  const regiserSW = always || !isDev
  if ('serviceWorker' in navigator && regiserSW) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./sw.js')
        .then(registration => {
          console.log(
            'ServiceWorker registration successful with scope: ',
            registration.scope
          )
        })
        .catch(error => {
          console.log('ServiceWorker registration failed: ', error)
        })
    })
  }
}

export default startServiceWorker
