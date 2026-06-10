import api from '../axios/api'
import type { IRegisterForm } from '../../types/IAuth'
import type { IUser } from '../../types/IUser'

export interface IUpdateProfileForm {
    name?: string
    email?: string
    telefone?: string
}

class UsersApi {
    async register(payload: IRegisterForm): Promise<void> {
        await api.post('/users', payload)
    }

    async getMe(): Promise<IUser> {
        const response = await api.get<IUser>('/users/me')
        return response.data
    }

    async updateMe(payload: IUpdateProfileForm): Promise<IUser> {
        const response = await api.patch<IUser>('/users/me', payload)
        return response.data
    }

    async deleteMe(): Promise<void> {
        await api.delete('/users/me')
    }
}

export default new UsersApi()
