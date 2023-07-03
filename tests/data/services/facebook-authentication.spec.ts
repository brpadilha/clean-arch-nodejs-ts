import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'
import { mock, MockProxy } from 'jest-mock-extended'

describe(
  'FacebookAuthenticationService',
  () => {
    let loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
    let sut: FacebookAuthenticationService
    beforeEach(() => {
      loadFacebookUserApi = mock()
      sut = new FacebookAuthenticationService(loadFacebookUserApi)
    })
    it('should call loadFacebookUserApi with correct params', async () => {
      await sut.perform({
        token: 'any_token'
      })

      expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({
        token: 'any_token'
      })
      expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
    })
    it('should return AuthenticationError when loadFacebookUserApi returns undefined', async () => {
      loadFacebookUserApi.loadUser.mockResolvedValue(undefined)
      const sut = new FacebookAuthenticationService(loadFacebookUserApi)

      const resultSut = await sut.perform({
        token: 'any_token'
      })

      expect(resultSut).toEqual(new AuthenticationError())
    })
  }
)
