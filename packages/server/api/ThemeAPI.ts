import type { Request } from 'express'
import { ThemeService } from '../services/themeService'

const themeService = new ThemeService()

class ThemeAPI {
  public static create = async (request: Request) => {
    const { body } = request
    await themeService.create(body)
  }
}
export { ThemeAPI }
