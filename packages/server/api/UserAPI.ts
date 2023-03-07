import type { Request, Response } from 'express'
import { UserService } from '../services/UserService'

const userService = new UserService()

class UserAPI {
  public static findAll = async (_request: Request, response: Response) => {
    const allUsers = await userService.getAll()
    return response.status(200).json(allUsers)
  }
  public static find = async (request: Request, response: Response) => {
    const { params } = request
    const user = await userService.find({ yandex_id: Number(params.id) })
    if (user !== null) {
      return response.status(200).json(user)
    }
    return response.status(404).send('User not found')
  }
  public static create = async (request: Request, response: Response) => {
    const { body } = request
    try {
      await userService.create(body)
      return response.status(201).end('Success')
    } catch (error) {
      return response.status(500).end('Failed to create user')
    }
  }
  public static delete = async (request: Request, response: Response) => {
    const { body } = request
    try {
      const deleted = await userService.delete(body)
      if (deleted === 0) {
        return response.status(404).end(`No such user`)
      } else {
        return response.status(200).end(`Success. Deleted ${deleted} user(s)`)
      }
    } catch (error) {
      return response.status(500).end('Failed to delete user')
    }
  }
}

export { UserAPI }
