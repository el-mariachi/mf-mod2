import { Op } from 'sequelize'
import type { BaseRESTService } from './BaseService'
import { User } from '../db/models/User'
import { Theme } from '../db/models/Theme'
import { UserTheme } from '../db/models/UserTheme'
import { sequelize } from '../db/init'

interface FindRequest {
  yandex_id?: number
  user_name?: string
}

interface CreateRequest {
  yandex_id: number
  user_name: string
  theme: string
}

class UserService implements BaseRESTService {
  public getAll = () => {
    return User.findAll()
  }
  public find = ({ yandex_id }: FindRequest) => {
    return User.findOne({
      where: { yandex_id },
      include: [
        {
          model: UserTheme,
          attributes: ['theme_id'],
          required: true,
          include: [{ model: Theme }],
        },
      ],
    })
  }
  public create = async (data: CreateRequest) => {
    const { yandex_id, user_name, theme } = data
    if (theme === undefined) {
      return User.create({ yandex_id, user_name })
    } else {
      const transaction = await sequelize.transaction()
      try {
        const user = await User.create(
          { yandex_id, user_name },
          { transaction }
        )
        const user_theme = await Theme.findOne({
          where: {
            theme: {
              [Op.like]: `%${theme}%`,
            },
          },
        })
        if (user_theme !== null) {
          await UserTheme.create(
            { user_id: user.yandex_id, theme_id: user_theme.id },
            { transaction }
          )
        }
        return await transaction.commit()
      } catch (error) {
        return await transaction.rollback()
      }
    }
  }
  // public update = (oldTheme: Theme, data: CreateRequest) => {
  //   const { theme, description } = data
  //   return oldTheme.update({ theme, description })
  // }
  public delete = (user: User) => {
    return User.destroy({
      where: {
        yandex_id: user.id,
      },
    })
  }
}

export { UserService }
