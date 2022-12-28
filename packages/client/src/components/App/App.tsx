import { Route, Routes } from 'react-router-dom'
import AuthPage from '../../pages/AuthPage'
import ForumPage from '../../pages/ForumPage/ForumPage'
import GamePage from '../../pages/GamePage/GamePage'
import Leaderboard from '../../pages/Leaderboard/Leaderboard'
import Profile from '../../pages/profile'
import ServicePage from '../../pages/ServicePage/ServicePage'
import SignUp from '../../pages/sign_up'
import './App.scss'

function App() {
  // useEffect(() => {
  //   const fetchServerData = async () => {
  //     const url = `http://localhost:${__SERVER_PORT__}`
  //     const response = await fetch(url)
  //     const data = await response.json()
  //     console.log(data)
  //   }

  //   fetchServerData()
  // }, [])
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<GamePage />} />
        <Route path="sign-in" element={<SignUp />} />
        <Route path="sign-up" element={<AuthPage />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route
          path="profile"
          element={
            <Profile
              user={{
                id: 1,
                avatar:
                  'https://cdn-icons-png.flaticon.com/512/5953/5953714.png',
                displayName: 'Новый пользователь',
                email: 'email@email.ru',
                firstName: 'Пользователь',
                login: 'user',
                phone: '+7-999-99-99',
                secondName: 'Пользователь',
              }}
            />
          }
        />
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
