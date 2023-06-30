import { LoadFacebookUserApi } from '@/data/contracts/apis/facebook'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  result: undefined

  async loadUser (params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
    this.token = params.token
    return this.result
  }
}

describe(
  'FacebookAuthenticationService',
  () => {
    it('should call loadFacebookUserApi with correct params', async () => {
      const loadFacebookUserApi = new LoadFacebookUserApiSpy()
      const sut = new FacebookAuthenticationService(loadFacebookUserApi)

      await sut.perform({
        token: 'any_token'
      })

      expect(loadFacebookUserApi.token).toBe('any_token')
    })
    it('should return AuthenticationError when loadFacebookUserApi returns undefined', async () => {
      const loadFacebookUserApi = new LoadFacebookUserApiSpy()
      loadFacebookUserApi.result = undefined
      const sut = new FacebookAuthenticationService(loadFacebookUserApi)

      const resultSut = await sut.perform({
        token: 'any_token'
      })

      expect(resultSut).toEqual(new AuthenticationError())
    })
  }
)