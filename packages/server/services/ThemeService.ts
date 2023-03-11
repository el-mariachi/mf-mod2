import { Op } from 'sequelize'
import type { BaseRESTService } from '@services/BaseService'
import { Theme } from '@models/Theme'

interface FindRequest {
  id?: number
  title?: string
}

interface CreateRequest {
  theme: string
  description?: string
}

class ThemeService implements BaseRESTService {
  public getAll = () => {
    return Theme.findAll()
  }
  public find = ({ id, title }: FindRequest) => {
    if (id) {
      return Theme.findByPk(id)
    }
    return Theme.findOne({
      where: {
        theme: {
          [Op.like]: `%${title}%`,
        },
      },
    })
  }
  public create = (data: CreateRequest) => {
    const { theme, description } = data
    if (description !== undefined) {
      return Theme.create({ theme, description })
    } else {
      return Theme.create({ theme })
    }
  }
  // public update = (oldTheme: Theme, data: CreateRequest) => {
  //   const { theme, description } = data
  //   return oldTheme.update({ theme, description })
  // }
  public delete = (theme: Theme) => {
    return Theme.destroy({
      where: {
        id: theme.id,
      },
    })
  }
}

export { ThemeService }
