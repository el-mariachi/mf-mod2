import { muteRes } from '@utils/index'
import { restAppUserApi } from '@api/index'

export type AppUserApiData = {
  yandex_id: number
  login: string
  user_theme: {
    id: number
    theme_id: number
    theme: {
      theme: string
      description: string | null
    }
  } | null
}
export const getAppUser = (userId: number) =>
  restAppUserApi.get<AppUserApiData>(`/${userId}`)
export const setAppUserTheme = (userId: number, themeId: number) =>
  restAppUserApi.post(`/${userId}/theme`, { id: themeId }).then(muteRes)

export default { getAppUser, setAppUserTheme }
