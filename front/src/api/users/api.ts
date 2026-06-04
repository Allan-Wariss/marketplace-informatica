import api from '../axios/api'
import type { IRegisterForm } from '../../types/IAuth'

class UsersApi {
    async register(payload: IRegisterForm): Promise<void> {
        await api.post('/users', payload)
    }
}

export default new UsersApi()
