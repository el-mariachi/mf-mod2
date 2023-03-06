import type { Request, Response } from 'express'
import { ThemeService } from '../services/ThemeService'

const themeService = new ThemeService()

class ThemeAPI {
  public static findAll = async (_request: Request, response: Response) => {
    const allThemes = await themeService.getAll()
    return response.status(200).json(allThemes)
  }
  public static find = async (request: Request, response: Response) => {
    const { body } = request
    const theme = await themeService.find(body)
    if (theme !== null) {
      response.status(200).json(theme)
    }
  }
  public static create = async (request: Request) => {
    const { body } = request
    await themeService.create(body)
  }
}
export { ThemeAPI }
