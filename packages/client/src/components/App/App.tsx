import { useEffect } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { defineUser } from '../../services/authController'
import SignIn from '@pages/SignIn'
import ForumPage from '@pages/ForumPage'
import GamePage from '@pages/GamePage'
import Leaderboard from '@pages/Leaderboard'
import UserProfile from '@pages/UserProfile'
import ServicePage from '@pages/ServicePage'
import SignUp from '@pages/SignUp'

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
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route
          path="*"
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
