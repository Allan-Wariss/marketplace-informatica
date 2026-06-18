import type { ICategory } from '../../types/ICategory'
import api from '../axios/api'

class CategoriesApi {
    async getAll(): Promise<ICategory[]> {
        const response = await api.get<ICategory[]>('/category')
        return response.data
    }

    async getVendasPorCategoria(): Promise<ICategory[]> {
        const response = await api.get<ICategory[]>('/category/relatorio/vendas-por-categoria')
        return response.data
    }
}

export default new CategoriesApi()