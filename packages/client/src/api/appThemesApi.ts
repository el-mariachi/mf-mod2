import { restAppThemesApi } from '@api/index'

export type AppThemeApiData = {
  id: number
  theme: string
  description: string | null
}
export const getAppThemes = () => restAppThemesApi.get<AppThemeApiData[]>()

export default { getAppThemes }
