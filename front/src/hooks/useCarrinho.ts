import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import CarrinhoApi from '../api/carrinho/api'
import PedidoApi from '../api/pedido/api'
import type { ICarrinho } from '../types/ICarrinho'
import type { ICarrinhoItem } from '../types/ICarrinhoItem'
import type { IHistorico } from '../types/IHistorico'

export const useCarrinho = () => {
    const navigate = useNavigate()

    const [carrinho, setCarrinho] = useState<ICarrinho | null>(null)
    const [loading, setLoading] = useState(false)
    const [loadingFinalizando, setLoadingFinalizando] = useState(false)
    const [confirmandoCompra, setConfirmandoCompra] = useState(false)
    const [historico, setHistorico] = useState<IHistorico[]>([])
    const [loadingHistorico, setLoadingHistorico] = useState(false)

    const carregarCarrinho = useCallback(async () => {
        setLoading(true)
        try {
            const data = await CarrinhoApi.getCarrinho()
            setCarrinho(data)
        } catch {
            setCarrinho(null)
        } finally {
            setLoading(false)
        }
    }, [])

    const carregarHistorico = useCallback(async () => {
        setLoadingHistorico(true)
        try {
            const data = await PedidoApi.getHistorico()
            setHistorico(data)
        } catch {
            setHistorico([])
        } finally {
            setLoadingHistorico(false)
        }
    }, [])

    const adicionarItem = async (produto_id: string) => {
        try {
            const data = await CarrinhoApi.addItem(produto_id)
            setCarrinho(data)
            toast.success('Produto adicionado ao carrinho!')
        } catch (err: any) {
            const msg = err?.response?.data?.message
            toast.error(typeof msg === 'string' ? msg : 'Erro ao adicionar ao carrinho.')
        }
    }

    const atualizarQuantidade = async (item: ICarrinhoItem, quantidade: number) => {
        if (quantidade < 1) return
        try {
            const data = await CarrinhoApi.updateItem(item.id, quantidade)
            setCarrinho(data)
        } catch {
            toast.error('Erro ao atualizar quantidade.')
        }
    }

    const removerItem = async (itemId: string) => {
        try {
            const data = await CarrinhoApi.removeItem(itemId)
            setCarrinho(data)
            toast.success('Item removido.')
        } catch {
            toast.error('Erro ao remover item.')
        }
    }

    const finalizarCompra = async () => {
        setLoadingFinalizando(true)
        try {
            await PedidoApi.criarPedido()
            toast.success('Pedido realizado com sucesso!')
            setCarrinho(null)
            setConfirmandoCompra(false)
            await carregarHistorico()
        } catch (err: any) {
            const msg = err?.response?.data?.message
            toast.error(typeof msg === 'string' ? msg : 'Erro ao finalizar pedido.')
        } finally {
            setLoadingFinalizando(false)
        }
    }

    const itens = carrinho?.itens ?? []
    const valorTotal = Number(carrinho?.valor_total ?? 0)
    const totalItens = itens.reduce((acc, i) => acc + i.quantidade, 0)

    return {
        carrinho,
        loading,
        loadingFinalizando,
        confirmandoCompra,
        setConfirmandoCompra,
        itens,
        valorTotal,
        totalItens,
        historico,
        loadingHistorico,
        carregarCarrinho,
        carregarHistorico,
        adicionarItem,
        atualizarQuantidade,
        removerItem,
        finalizarCompra,
    }
}
