import type { ICarrinho } from '../../types/ICarrinho'
import api from '../axios/api'

class CarrinhoApi {
    async getCarrinho(): Promise<ICarrinho> {
        const response = await api.get<ICarrinho>('/carrinho')
        return response.data
    }

    async addItem(produto_id: string, quantidade = 1): Promise<ICarrinho> {
        const response = await api.post<ICarrinho>('/carrinho/itens', { produto_id, quantidade })
        return response.data
    }

    async updateItem(itemId: string, quantidade: number): Promise<ICarrinho> {
        const response = await api.patch<ICarrinho>(`/carrinho/itens/${itemId}`, { quantidade })
        return response.data
    }

    async removeItem(itemId: string): Promise<ICarrinho> {
        const response = await api.delete<ICarrinho>(`/carrinho/itens/${itemId}`)
        return response.data
    }

    async limpar(): Promise<void> {
        await api.delete('/carrinho')
    }
}

export default new CarrinhoApi()
