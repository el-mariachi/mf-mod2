import { useEffect } from 'react'
import './App.css'
import AuthPage from './pages/auth/'

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
  return <AuthPage />
}

export default App
