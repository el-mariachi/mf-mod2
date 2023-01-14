import { restResourceApi } from '@api/restApi'

export const getFile = (file: string) => restResourceApi.url + file
export const uploadFile = (file: FormData) =>
  restResourceApi.post<FileData>('', file)

export default { getFile, uploadFile }
