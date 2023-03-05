import type { BaseRESTService } from './baseService'
import { Theme } from '../db/models/Theme'

interface FindRequest {
  id?: number
  title?: string
}

interface CreateRequest {
  title: string
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
        theme: `%${title}%`,
      },
    })
  }
  public create = (data: CreateRequest) => {
    const { title, description } = data
    if (description !== undefined) {
      return Theme.create({ title, description })
    } else {
      return Theme.create({ title })
    }
  }
  public update = (theme: Theme, data: CreateRequest) => {
    const { title, description } = data
    return theme.update({ title, description })
  }
  public delete = (theme: Theme) => {
    return Theme.destroy({
      where: {
        id: theme.id,
      },
    })
  }
}

export { ThemeService }
