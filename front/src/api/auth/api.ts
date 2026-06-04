import api from '../axios/api'
import type { ILoginPayload, ILoginResponse } from '../../types/IAuth'

class AuthApi {
  async login(payload: ILoginPayload): Promise<ILoginResponse> {
    const response = await api.post<ILoginResponse>('/auth/login', payload)
    return response.data
  }
}

export default new AuthApi()
