import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import ForumPage from './components/ForumPage/ForumPage'
import ServicePage from './components/ServicePage/ServicePage'
import './App.css'
import GameStub from './components/GameStub/GameStub'

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
    <div className="app">
      <Routes>
        <Route path="/" element={<GameStub />} />
        <Route path="/404" element={<ServicePage />} />
        <Route path="/500" element={<ServicePage />} />
        <Route path="/forum" element={<ForumPage />} />
      </Routes>
    </div>
  )
}

export default App
