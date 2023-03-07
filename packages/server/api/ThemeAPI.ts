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
      return response.status(200).json(theme)
    }
    return response.status(404).send('Theme not found')
  }
  public static create = async (request: Request, response: Response) => {
    const { body } = request
    try {
      await themeService.create(body)
      return response.status(201).end('Success')
    } catch (error) {
      return response.status(500).end('Failed to create theme')
    }
  }
  public static delete = async (request: Request, response: Response) => {
    const { body } = request
    try {
      const deleted = await themeService.delete(body)
      if (deleted === 0) {
        return response.status(404).end(`No such theme`)
      } else {
        return response.status(200).end(`Success. Deleted ${deleted} record(s)`)
      }
    } catch (error) {
      return response.status(500).end('Failed to delete theme')
    }
  }
}
export { ThemeAPI }
