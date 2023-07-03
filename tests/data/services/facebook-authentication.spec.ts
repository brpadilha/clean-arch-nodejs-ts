import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'
import { mock } from 'jest-mock-extended'

describe(
  'FacebookAuthenticationService',
  () => {
    it('should call loadFacebookUserApi with correct params', async () => {
      const loadFacebookUserApi = mock<LoadFacebookUserApi>()
      const sut = new FacebookAuthenticationService(loadFacebookUserApi)

      await sut.perform({
        token: 'any_token'
      })

      expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({
        token: 'any_token'
      })
      expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
    })
    it('should return AuthenticationError when loadFacebookUserApi returns undefined', async () => {
      const loadFacebookUserApi = mock<LoadFacebookUserApi>()

      loadFacebookUserApi.loadUser.mockResolvedValue(undefined)
      const sut = new FacebookAuthenticationService(loadFacebookUserApi)

      const resultSut = await sut.perform({
        token: 'any_token'
      })

      expect(resultSut).toEqual(new AuthenticationError())
    })
  }
)
