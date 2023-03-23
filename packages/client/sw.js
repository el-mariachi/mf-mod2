const CACHE_NAME = 'my-site-cache-v1'

const URLS = [
  '/',
  '/sign-up',
  '/sign-in',
  '/leaderboard',
  '/profile',
  '/forum',
]

this.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache')
        return cache.addAll(URLS)
      })
      .catch(err => {
        console.log(err)
        throw err
      })
  )
})

this.addEventListener('fetch', event => {
  const url = event.request.url
  if (
    url.startsWith('chrome-extension') ||
    url.includes('extension') ||
    !(url.indexOf('http') === 0)
  ) return;
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        if (response) {
          return response
        }
        const fetchRequest = event.request.clone()
        return fetch(fetchRequest).then(response => {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response
          }

          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache)
          })
          return response
        })
      })
      .catch(() =>
        useFallback().then(res => {
          return res
        })
      )
  )
})

this.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.map(name => caches.delete(name)))
    })
  )
})

const FALLBACK = `
<main className="d-flex justify-content-center vh-100 service-page">
    <div className="d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-1 minecrafted">10110...</h1>
        <p>А все. Интернета больше нет</p>
        <a href="/">
            <span role="button" tabindex="0" class="mb-1 btn btn-outline-primary">На главную</span>
        </a>
    </div>
</main>`

function useFallback() {
  return Promise.resolve(
    new Response(FALLBACK, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    })
  )
}
