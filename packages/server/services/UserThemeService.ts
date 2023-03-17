import type { BaseRESTService } from '@services/BaseService'
import { UserTheme } from '@models/UserTheme'

interface CreateRequest {
  user_id: number
  theme_id: number
}

class UserThemeService implements BaseRESTService {
  public create = ({ user_id, theme_id }: CreateRequest) => {
    return UserTheme.create({ user_id, theme_id })
  }
  public updateTheme = ({ user_id, theme_id }: CreateRequest) => {
    return UserTheme.update(
      { theme_id },
      {
        where: {
          user_id,
        },
      }
    )
  }
}

export { UserThemeService }
