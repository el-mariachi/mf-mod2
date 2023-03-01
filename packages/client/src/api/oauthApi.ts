import { restOauthApi } from '@api/restApi'

type OauthSigninRequestData = {
  code: string
  redirect_uri: string
}
type OauthServiceIdResponseData = { service_id: string }

const signInWithYandexId = (data: OauthSigninRequestData) =>
  restOauthApi.post('', data)

const getYandexServiceId = (redirect_uri: string) =>
  restOauthApi.get<OauthServiceIdResponseData>(
    `/service-id?redirect_uri=${redirect_uri}`
  )

export default { signInWithYandexId, getYandexServiceId }
