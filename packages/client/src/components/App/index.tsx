import { Route, Routes, useNavigate } from 'react-router-dom'
import SignIn from '@pages/SignIn'
import ForumPage from '@pages/ForumPage'
import GamePage from '@pages/GamePage'
import Leaderboard from '@pages/Leaderboard'
import UserProfile from '@pages/UserProfile'
import ServicePage from '@pages/ServicePage'
import SignUp from '@pages/SignUp'
import MainPage from '@pages/MainPage'
import ROUTES from '@constants/routes'
import { useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '@hooks/redux_typed_hooks'
import { loadUser } from '@store/slices/user'
import { SignInWithOauth } from '@services/oauthController'
import appThemesController from '@services/appThemesController'
import { AppContainerContext, AppThemeContext } from 'context'
import { appThemeDefault } from '@constants/ui'
import { serverErrorHandler } from '@utils/errorsHandling'
import { isArraysEqual } from '@utils/isEqual'
import './App.scss'
import ForumTopicDetail from '@components/ForumTopicDetail'
import AddForumTopicForm from '@components/AddForumTopicForm'
import EditForumTopicForm from '@components/EditForumTopicForm'
import ForumTopicsList from '@components/ForumTopicsList'

function App() {
  const setAppTheme = (themeName: string, themesList?: string[]) => {
    if (
      themesList &&
      themesList.length &&
      !isArraysEqual(appThemesList.current, themesList)
    ) {
      appThemesList.current = themesList
      if (!themesList.includes(appThemeName.current)) {
        appThemeName.current = themesList[0]
      }
      localStorage.setItem('themesList', JSON.stringify(themesList))
      setTheme({
        active: appThemeName.current,
        switch: switchTheme,
        list: themesList,
      })
    }
    switchTheme(themeName)
  }
  const switchTheme = (themeName: string) => {
    if (
      appThemesList.current.includes(themeName) &&
      themeName !== appThemeName.current
    ) {
      appThemeName.current = themeName
      appThemesController
        .setTheme(themeName)
        .catch(error =>
          serverErrorHandler(error, () => navigate(ROUTES.SERVER_ERROR))
        )
        .finally(() => localStorage.setItem('activeTheme', themeName)) // local storage as fallback
      setTheme({
        active: themeName,
        switch: switchTheme,
        list: appThemesList.current,
      })
    }
  }
  const appThemeName = useRef(appThemeDefault.active)
  const appThemesList = useRef(appThemeDefault.list)
  const [theme, setTheme] = useState({
    active: appThemeName.current,
    switch: switchTheme,
    list: appThemesList.current,
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    let storedThemesList: string[] | null
    const serializedThemesList = localStorage.getItem('themesList')
    try {
      storedThemesList = serializedThemesList
        ? JSON.parse(serializedThemesList)
        : null
    } catch {
      storedThemesList = null
    }
    const storedTheme = localStorage.getItem('activeTheme')
    if (storedTheme) {
      setAppTheme(storedTheme, storedThemesList || [])
    }

    SignInWithOauth()
      .then(() => dispatch(loadUser()))
      .then(() =>
        Promise.allSettled([
          appThemesController.getTheme(),
          appThemesController.getList(),
        ]).then(res => {
          const [themeRes, themesListRes] = res
          const theme = 'fulfilled' == themeRes.status ? themeRes.value : ''
          const themesList =
            'fulfilled' == themesListRes.status ? themesListRes.value : []

          setAppTheme(theme, themesList)

          const resRejected = res.find(
            resItem => 'rejected' == resItem.status && resItem.reason
          ) as PromiseRejectedResult | undefined
          if (resRejected) {
            throw resRejected.reason
          }
        })
      )
      .catch(error =>
        serverErrorHandler(error, () => navigate(ROUTES.SERVER_ERROR))
      )
  }, [])

  const refAppContainer = useRef<HTMLDivElement>(null)
  return (
    <AppThemeContext.Provider value={theme}>
      <div ref={refAppContainer} className="app" data-theme={theme.active}>
        <AppContainerContext.Provider value={refAppContainer}>
          <Routes>
            <Route path={ROUTES.ROOT} element={<MainPage />} />
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
            <Route path={ROUTES.FORUM} element={<ForumPage />}>
              <Route index element={<ForumTopicsList />} />
              <Route path="topic/new" element={<AddForumTopicForm />} />
              <Route path="topic/edit/:id" element={<EditForumTopicForm />} />
              <Route path="topic/:id" element={<ForumTopicDetail />} />
            </Route>
          </Routes>
        </AppContainerContext.Provider>
      </div>
    </AppThemeContext.Provider>
  )
}
export default App
