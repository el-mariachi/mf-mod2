import { useEffect } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { defineUser } from '../../services/authController'
import AuthPage from '../../pages/AuthPage'
import ForumPage from '../../pages/ForumPage/ForumPage'
import GamePage from '../../pages/GamePage/GamePage'
import Leaderboard from '../../pages/Leaderboard/Leaderboard'
import Profile from '../../pages/profile'
import ServicePage from '../../pages/ServicePage/ServicePage'
import SignUp from '../../pages/sign_up'
import './App.scss'

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    defineUser()
      // TODO it`s temporary, use connected-react-router
      .then(() => {
        if (['/sign-in', '/sign-up'].includes(location.pathname)) {
          navigate('/')
        }
      })
  }, [])
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/game" replace />} />
        <Route path="game" element={<GamePage />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<AuthPage />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="profile" element={<Profile />} />
        <Route
          path="/404"
          element={
            <ServicePage
              errorCode={404}
              errorText={'Запрошенная страница не найдена'}
            />
          }
        />
        <Route
          path="/500"
          element={
            <ServicePage
              errorCode={500}
              errorText={'Внутренняя ошибка сервера'}
            />
          }
        />
        <Route path="/forum" element={<ForumPage />} />
      </Routes>
    </div>
  )
}

export default App
