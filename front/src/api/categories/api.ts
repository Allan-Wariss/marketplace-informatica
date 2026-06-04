import type { ICategory } from '../../types/ICategory'
import api from '../axios/api'

class CategoriesApi {
    async getAll(): Promise<ICategory[]> {
        const response = await api.get<ICategory[]>('/category')
        return response.data
    }
}

export default new CategoriesApi()
