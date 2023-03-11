abstract class BaseRESTService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract request?: (...args: any[]) => Promise<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract create?: (...args: any[]) => Promise<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract update?: (...args: any[]) => Promise<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract delete?: (...args: any[]) => Promise<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract find?: (...args: any[]) => Promise<any>
}

export { BaseRESTService }
