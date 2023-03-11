import appThemesApi from '@api/appThemesApi'
import appUsersApi from '@api/appUserApi'
import { store } from '@store/index'
import { selectUserData } from '@store/selectors'
import { apiErrorHandler } from '@utils/errorsHandling'

export default new (class {
  protected _themes: Record<string, number> = {}
  getList() {
    // return Promise.resolve(['default', 'acid', 'doomer', 'frozen', 'mint'])
    console.log('getList')
    return appThemesApi.getAppThemes()
      .then(themesData => {
        this._themes = {}
        return themesData.map(themeData => {
          console.log(themeData);
          const {id, theme} = themeData
          this._themes[theme] = id
          return theme
        })
      })
      .catch(error => apiErrorHandler(error))
  }
  getTheme() {
    // return Promise.resolve('default')
    console.log('getTheme')
    if (this._userId) {
      return appUsersApi.getAppUser(this._userId)
        .then(userData => {console.log(userData); return userData.user_theme?.theme.theme || ''}) 
        .catch(error => apiErrorHandler(error))
    }
    return Promise.resolve('')
  }
  setTheme(themeName: string) {
    // return Promise.resolve()
    console.log('setTheme')
    if (this._userId && themeName in this._themes) {
      const themeId = this._themes[themeName]
      return appUsersApi.setAppUserTheme(this._userId, themeId)
        .then(res => console.log(res))
        .catch(error => apiErrorHandler(error))
    }
    return Promise.resolve()
  }
  protected get _userId() {
    return selectUserData(store.getState()).id
  }
})()
