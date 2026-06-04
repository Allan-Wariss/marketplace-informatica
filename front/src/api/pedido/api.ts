import type { IPedido } from '../../types/IPedido'
import type { IHistorico } from '../../types/IHistorico'
import api from '../axios/api'

class PedidoApi {
    async criarPedido(): Promise<IPedido> {
        const response = await api.post<IPedido>('/pedido')
        return response.data
    }

    async getMeusPedidos(): Promise<IPedido[]> {
        const response = await api.get<IPedido[]>('/pedido')
        return response.data
    }

    async getHistorico(): Promise<IHistorico[]> {
        const response = await api.get<IHistorico[]>('/pedido/historico')
        return response.data
    }
}

export default new PedidoApi()
