import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { IProduct } from "../types/IProduct"
import type { ICategory } from "../types/ICategory"
import Products from "../api/products/api"
import CategoriesApi from "../api/categories/api"

const TAKE = 12

export const useProducts = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const query = searchParams.get('q') ?? ''
    const pageFromUrl = parseInt(searchParams.get('page') ?? '0', 10)
    const filter = (searchParams.get('filter') ?? 'todos') as 'todos' | 'meus'

    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [total, setTotal] = useState<number>(0)

    const [categoriasRelatorio, setCategoriasRelatorio] = useState<ICategory[]>([])
    const [loadingRelatorio, setLoadingRelatorio] = useState<boolean>(false)

    const fetch = async (q: string, pageIndex: number): Promise<void> => {
        setLoading(true)

        try {
            const data = q
                ? await Products.searchProducts(q, pageIndex, TAKE, filter)
                : await Products.getProducts(pageIndex, TAKE, filter)

            setProducts(data.products)
            setTotal(data.total)
        } catch {
            setProducts([])
            setTotal(0)
        } finally {
            setLoading(false)
        }
    }

    const carregarRelatorio = async (): Promise<void> => {
        setLoadingRelatorio(true)

        try {
            const data = await CategoriesApi.getVendasPorCategoria()

            const categoriasComVenda = data.filter(
                (categoria: ICategory) => Number(categoria.totais_vendas) > 0
            )

            setCategoriasRelatorio(categoriasComVenda)
        } catch (error) {
            console.error('Erro ao carregar relatório:', error)
            setCategoriasRelatorio([])
        } finally {
            setLoadingRelatorio(false)
        }
    }

    const goToPage = (pageIndex: number): void => {
        const next = new URLSearchParams(searchParams)
        next.set('page', String(pageIndex))
        setSearchParams(next, { replace: true })
    }

    const nextPage = (): void => goToPage(pageFromUrl + 1)

    const prevPage = (): void => goToPage(pageFromUrl - 1)

    const totalPages = Math.ceil(total / TAKE)
    const currentPage = pageFromUrl

    return {
        products,
        categoriasRelatorio,
        loading,
        loadingRelatorio,
        query,
        filter,
        fetch,
        carregarRelatorio,
        goToPage,
        nextPage,
        prevPage,
        currentPage,
        totalPages,
    }
}