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
export type AppError = Error & {
  cause: {
    code: AppErrorCode
    msg: string
    additional?: string
  }
}
export function createAppError(
  msg: string,
  code = 0,
  module = '',
  additional?: string
) {
  return new Error(module ? `${module}: ${msg}` : msg, {
    cause: { code, msg, additional },
  }) as AppError
}
export function apiErrorHandler(error: Error): never {
  if (!('cause' in error)) {
    // dev (in code, no api) error
    throw createAppError(error.message, AppErrorCode.unknown)
  }

  const { code, msg, additional } = (error as AppError).cause

  if (AppErrorCode.userInput == code) {
    // wrong data input from user, just pass it through to form
    throw error
  } else if (AppErrorCode.restApiRequest == code) {
    // wrong data input from user, defined by server
    throw createAppError(msg, AppErrorCode.userInput)
  } else if (AppErrorCode.restApiAuth == code) {
    store.dispatch(clearUser())
    throw createAppError(msg, AppErrorCode.userInput, 'auth form', additional)
  }
  // dev (api) error
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
