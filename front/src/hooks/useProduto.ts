import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductsApi from '../api/products/api'
import type { IProduct } from '../types/IProduct'

export const useProduto = () => {
    const { id } = useParams<{ id: string }>()

    const [product, setProduct] = useState<IProduct | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!id) return

        setLoading(true)
        ProductsApi.getProductById(id)
            .then(setProduct)
            .catch(() => setError('Produto não encontrado.'))
            .finally(() => setLoading(false))
    }, [id])

    const adicionarAoCarrinho = () => {
        // TODO: implementar lógica de carrinho
    }

    const comprar = () => {
        // TODO: implementar lógica de compra
    }

    return { product, loading, error, adicionarAoCarrinho, comprar }
}
