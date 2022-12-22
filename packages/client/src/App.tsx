import { useEffect } from 'react'
import './App.css'
import ForumPage from './components/ForumPage/ForumPage'
import ServicePage from './components/ServicePage/ServicePage'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <div className="App">
      <ServicePage />
      <ForumPage />
    </div>
  )
}

export default App
