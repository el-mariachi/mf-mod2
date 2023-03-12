import { store } from '@store/index'
import { clearUser } from '@store/slices/user'

export const enum AppErrorCode {
  unknown = 0,
  restApiRequest = 400,
  restApiAuth,
  restApiAccess = 403,
  restApiUrl,
  restApiServer = 500,
  wsApi = 600,
  default = 700,
  dev,
  userInput,
}
export function createAppError(
  msg: string,
  code = 0,
  module = '',
  additional?: string
) {
  return new AppError(module ? `${module}: ${msg}` : msg, {
    code,
    msg,
    additional,
  })
}
export function apiErrorHandler(error: Error): never {
  if (!('cause' in error)) {
    // dev (in code, no api) error
    throw createAppError(error.message, AppErrorCode.unknown)
  }

  const { code, msg, additional } = ((<unknown>error) as AppError).cause

  if (AppErrorCode.userInput == code) {
    // wrong data input from user, just pass it through to form
    throw error
  } else if (AppErrorCode.restApiRequest == code) {
    // wrong data input from user, defined by server
    throw createAppError(msg, AppErrorCode.userInput)
  } else if (AppErrorCode.restApiAuth == code) {
    // unauthorized user
    store.dispatch(clearUser())
    throw createAppError(msg, AppErrorCode.userInput, 'auth form', additional)
  } else if (code >= AppErrorCode.restApiAccess) {
    // known dev (api) error
    throw createAppError(msg, code)
  }
  // unknown dev (api) error
  else throw createAppError(msg, AppErrorCode.dev, 'rest api', additional)
}
export function formUserErrorHandler(
  error: AppError,
  handler: (msg: string) => void
) {
  let userError = pickUserError(error)
  if (!userError) {
    userError = 'При отправке формы возникла неизвестная ошибка'
  }
  handler(userError)
}
export function pickUserError(error: AppError) {
  const { code, msg } = error.cause

  return AppErrorCode.userInput == code ? msg : null
}
type AppErrorCause = {
  code: AppErrorCode
  msg: string
  additional?: string
  message: string // for compatibility with Error object
  name: string
}
export class AppError extends Error {
  constructor(
    message: string, // for compatibility with Error object
    protected _cause: Omit<AppErrorCause, 'name' | 'message'>
  ) {
    super(message)
  }
  get cause() {
    return {
      ...this._cause,
      ...{
        message: this.message,
        name: this.name,
      },
    }
  }
  static create(
    // sugar
    msg: string,
    code = 0,
    module = '',
    additional?: string
  ) {
    return createAppError(msg, code, module, additional)
  }
}
