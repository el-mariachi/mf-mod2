import { store } from '@store/index'
import { clearUser } from '@store/slices/user'

export const enum AppErrorCode {
  unknown = 0,
  restApiRequest = 400,
  restApiAuth,
  restApiAccess = 403,
  restApiNoResource,
  restApiDependency = 424,
  restApiServer = 500,
  wsApi = 600,
  default = 700,
  dev,
  userInput,
  noRoute,
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
export function apiErrorHandler(
  error: Error,
  redefineNoResourceError = false
): never {
  if (!('cause' in error)) {
    // dev (in code, no api) error
    throw createAppError(error.message, AppErrorCode.unknown)
  }
  const { code, msg, additional } = ((<unknown>error) as AppError).cause
  if (AppErrorCode.userInput == code) {
    // wrong data input from user, just pass it through to form
    throw error
  } else if (AppErrorCode.restApiRequest == code) {
    // wrong data input from user (defined by server) or bad request (=dev error)
    throw createAppError(msg, AppErrorCode.restApiRequest)
  } else if (AppErrorCode.restApiAuth == code) {
    // unauthorized user
    store.dispatch(clearUser())
    throw createAppError(msg, AppErrorCode.userInput, 'auth form', additional)
  } else if (code == AppErrorCode.restApiNoResource) {
    if (redefineNoResourceError) {
      throw createAppError(msg, AppErrorCode.restApiRequest, additional) // known dev error
    } else throw createAppError(msg, code) // 404 error
  } else if (
    code == AppErrorCode.restApiAccess ||
    code > AppErrorCode.restApiAccess
  ) {
    // known dev error
    throw createAppError(msg, code)
  }
  // unknown dev error
  else throw createAppError(msg, AppErrorCode.dev, 'rest api', additional)
}
export function formUserErrorHandler(
  error: AppError,
  handler: (msg: string) => void
) {
  let userError = pickUserError(error) || pickRequestError(error) // for now cant differ user input error from bad client code for request
  if (!userError) {
    userError = 'При отправке формы возникла неизвестная ошибка'
    devErrorHandler(error)
  }
  handler(userError)
}
export function pickUserError(error: AppError) {
  const { code, msg } = error.cause

  return AppErrorCode.userInput == code ? msg : null
}
export function pickRequestError(error: AppError) {
  const { code, msg } = error.cause

  return AppErrorCode.restApiRequest == code ? msg : null
}
export function noRouteErrorHandler(
  error: AppError,
  handler: (msg: string) => void
) {
  const { code, msg } = error.cause
  if (AppErrorCode.noRoute == code) {
    handler(msg)
  }
}
export function clientSideErrorHandler(
  error: AppError,
  handler: (msg: string) => void
) {
  const clientSideError = pickClientSideError(error)
  if (clientSideError) {
    handler(clientSideError)
    devErrorHandler(error)
  }
}
export function pickClientSideError(error: AppError) {
  const { code, msg } = error.cause

  return code >= 400 && code < 500 ? msg : null
}
export function serverErrorHandler(
  error: AppError,
  handler: (msg: string) => void
) {
  const serverError = pickServerError(error)
  if (serverError) {
    handler(serverError)
    devErrorHandler(error)
  }
}
export function pickServerError(error: AppError) {
  const { code, msg } = error.cause

  return code >= 500 && code < 600 ? msg : null
}
export function devErrorHandler(error: AppError) {
  const { code, msg, additional } = error.cause
  if (code != AppErrorCode.restApiAuth) {
    console.error(code, msg, additional, error)
  }
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
