import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'
import { mock, MockProxy } from 'jest-mock-extended'

type SutTypes = {
  loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
  sut: FacebookAuthenticationService
}

const makeSut = (): SutTypes => {
  const loadFacebookUserApi = mock<LoadFacebookUserApi>()
  const sut = new FacebookAuthenticationService(loadFacebookUserApi)

  return {
    loadFacebookUserApi,
    sut
  }
}

describe(
  'FacebookAuthenticationService',
  () => {
    it('should call loadFacebookUserApi with correct params', async () => {
      const { loadFacebookUserApi, sut } = makeSut()
      await sut.perform({
        token: 'any_token'
      })

      expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({
        token: 'any_token'
      })
      expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
    })
    it('should return AuthenticationError when loadFacebookUserApi returns undefined', async () => {
      const { loadFacebookUserApi } = makeSut()

      loadFacebookUserApi.loadUser.mockResolvedValue(undefined)
      const sut = new FacebookAuthenticationService(loadFacebookUserApi)

      const resultSut = await sut.perform({
        token: 'any_token'
      })

      expect(resultSut).toEqual(new AuthenticationError())
    })
  }
)
