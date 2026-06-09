import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import CategoriesApi from '../api/categories/api'
import ProductsApi from '../api/products/api'
import type { ICategory } from '../types/ICategory'
import type { ICreateProductForm } from '../types/IProduct'

const INITIAL_FORM: ICreateProductForm = {
    categoria_id: '',
    titulo: '',
    descricao: '',
    preco: 0,
    imagem: undefined,
}

export const useCadastrarProduto = () => {
    const navigate = useNavigate()

    const [form, setForm] = useState<ICreateProductForm>(INITIAL_FORM)
    const [categorias, setCategorias] = useState<ICategory[]>([])
    const [previewImagem, setPreviewImagem] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [loadingCategorias, setLoadingCategorias] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        CategoriesApi.getAll()
            .then((data) => setCategorias(data))
            .catch(() => setError('Não foi possível carregar as categorias.'))
            .finally(() => setLoadingCategorias(false))
    }, [])


    const getCategorias = async () => {
        setLoadingCategorias(true)
        try {
            const data = await CategoriesApi.getAll()
            setCategorias(data)
        } catch (error) {
            setError('Não foi possível carregar as categorias.')
        } finally {
            setLoadingCategorias(false)
        }
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: name === 'preco' ? parseFloat(value) || 0 : value,
        }))
        setError(null)
    }

    const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                if (width > height) {
                    height = Math.round((height * MAX_DIMENSION) / width)
                    width = MAX_DIMENSION
                } else {
                    width = Math.round((width * MAX_DIMENSION) / height)
                    height = MAX_DIMENSION
                }
            }

            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')!
            ctx.drawImage(img, 0, 0, width, height)

            const base64 = canvas.toDataURL('image/jpeg', QUALITY)
            setForm((prev) => ({ ...prev, imagem: base64 }))
            setPreviewImagem(base64)
        }

        img.src = objectUrl
        setError(null)
    }

    const handleRemoverImagem = () => {
        setForm((prev) => ({ ...prev, imagem: undefined }))
        setPreviewImagem(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const payload: ICreateProductForm = { ...form }
            if (!payload.imagem) delete payload.imagem
            await ProductsApi.createProduct(payload)
            toast.success('Produto cadastrado com sucesso!')
            navigate('/home')
        } catch (err: any) {
            const msg = err?.response?.data?.message
            const errorMsg = typeof msg === 'string' ? msg : 'Erro ao cadastrar produto. Tente novamente.'
            setError(errorMsg)
            toast.error(errorMsg)
        } finally {
            setLoading(false)
        }
    }

    return {
        form,
        categorias,
        previewImagem,
        loading,
        loadingCategorias,
        error,
        getCategorias,
        fileInputRef,
        handleChange,
        handleImagemChange,
        handleRemoverImagem,
        handleSubmit,
    }
}
