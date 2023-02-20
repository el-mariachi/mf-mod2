import {
  useLoaderData,
  Outlet,
  Route,
  Navigate,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import SignIn from '@pages/SignIn'
import ForumPage from '@pages/ForumPage'
import GamePage from '@pages/GamePage'
import Leaderboard from '@pages/Leaderboard'
import UserProfile from '@pages/UserProfile'
import ServicePage from '@pages/ServicePage'
import SignUp from '@pages/SignUp'
import ROUTES from '@constants/routes'
import { FC, useEffect } from 'react'
import { useAppDispatch } from '@hooks/redux_typed_hooks'
import { loadUser, setUser } from '@store/slices/user'
import { store } from '@store/index'
import { SignInWithOauth } from '@services/oauthController'

const Layout: FC = () => {
  const loaderData = useLoaderData() as Promise<User> | null
  //const dispatch = useAppDispatch()
  if (loaderData instanceof Promise) {
    loaderData.then(user => {
      console.log('user', user)
      if(user !== null)  store.dispatch(setUser(user))
    })
  }

  return <Outlet />
}

const routes = createRoutesFromElements(
  <>
    <Route element={<Layout />} loader={SignInWithOauth}>
      <Route
        path={ROUTES.ROOT}
        element={<Navigate to={ROUTES.GAME} replace />}
      />
      <Route path={ROUTES.GAME} element={<GamePage />} />
      <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
      <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
      <Route path={ROUTES.LEADERBOARD} element={<Leaderboard />} />
      <Route path={ROUTES.PROFILE} element={<UserProfile />} />
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
        path={ROUTES.SERVER_ERROR}
        element={
          <ServicePage
            errorCode={500}
            errorText={'Внутренняя ошибка сервера'}
          />
        }
      />
      <Route path={ROUTES.FORUM} element={<ForumPage />} />
    </Route>
  </>
)

const router = createBrowserRouter(routes)

function App() {
  console.log('render app')
  /*const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(loadUser())
  }, [])*/
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
