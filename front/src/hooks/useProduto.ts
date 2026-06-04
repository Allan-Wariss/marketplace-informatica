import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import ProductsApi from '../api/products/api'
import { useAuth } from './useAuth'
import type { IProduct } from '../types/IProduct'
import type { ICreateProductForm } from '../types/IProduct'

export const useProduto = () => {
    const { id } = useParams<{ id: string }>()
    const { user } = useAuth()
    const navigate = useNavigate()

    const [product, setProduct] = useState<IProduct | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [editando, setEditando] = useState(false)
    const [editForm, setEditForm] = useState<Partial<ICreateProductForm>>({})
    const [loadingEdit, setLoadingEdit] = useState(false)

    const [confirmandoDelete, setConfirmandoDelete] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!id) return
        setLoading(true)
        ProductsApi.getProductById(id)
            .then((data) => {
                setProduct(data)
                setEditForm({
                    titulo: data.titulo,
                    descricao: data.descricao,
                    preco: Number(data.preco),
                    categoria_id: data.categoria_id,
                    imagem: data.imagem ?? undefined,
                })
            })
            .catch(() => setError('Produto não encontrado.'))
            .finally(() => setLoading(false))
    }, [id])

    const isOwner = !!user && !!product && user.id === product.vendedor_id

    const handleEditChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target
        setEditForm((prev) => ({
            ...prev,
            [name]: name === 'preco' ? parseFloat(value) || 0 : value,
        }))
    }

    const handleEditImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const MAX_DIMENSION = 800
        const QUALITY = 0.7
        const img = new Image()
        const objectUrl = URL.createObjectURL(file)

        img.onload = () => {
            URL.revokeObjectURL(objectUrl)
            let { width, height } = img
            if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
                if (width > height) { height = Math.round((height * MAX_DIMENSION) / width); width = MAX_DIMENSION }
                else { width = Math.round((width * MAX_DIMENSION) / height); height = MAX_DIMENSION }
            }
            const canvas = document.createElement('canvas')
            canvas.width = width; canvas.height = height
            canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
            const base64 = canvas.toDataURL('image/jpeg', QUALITY)
            setEditForm((prev) => ({ ...prev, imagem: base64 }))
        }
        img.src = objectUrl
    }

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!id) return
        setLoadingEdit(true)
        try {
            const updated = await ProductsApi.updateProduct(id, editForm)
            setProduct(updated)
            setEditando(false)
            toast.success('Produto atualizado!')
        } catch (err: any) {
            const msg = err?.response?.data?.message
            toast.error(typeof msg === 'string' ? msg : 'Erro ao atualizar produto.')
        } finally {
            setLoadingEdit(false)
        }
    }

    const handleDelete = async () => {
        if (!id) return
        setLoadingDelete(true)
        try {
            await ProductsApi.deleteProduct(id)
            toast.success('Produto removido.')
            navigate('/home')
        } catch {
            toast.error('Erro ao remover produto.')
        } finally {
            setLoadingDelete(false)
            setConfirmandoDelete(false)
        }
    }

    // --- Compra / Carrinho ---
    const adicionarAoCarrinho = () => {
        // TODO: implementar lógica de carrinho
    }

    const comprar = () => {
        // TODO: implementar lógica de compra
    }

    return {
        product,
        loading,
        error,
        isOwner,
        editando,
        setEditando,
        editForm,
        loadingEdit,
        fileInputRef,
        handleEditChange,
        handleEditImagemChange,
        handleEditSubmit,
        confirmandoDelete,
        setConfirmandoDelete,
        loadingDelete,
        handleDelete,
        adicionarAoCarrinho,
        comprar,
    }
}
