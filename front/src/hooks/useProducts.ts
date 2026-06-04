import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { IProduct } from "../types/IProduct"
import Products from "../api/products/api"

const TAKE = 12

export const useProducts = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const query = searchParams.get('q') ?? ''
    const pageFromUrl = parseInt(searchParams.get('page') ?? '0', 10)

    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [total, setTotal] = useState<number>(0)

    const fetch = async (q: string, pageIndex: number) => {
        setLoading(true)
        try {
            const data = q
                ? await Products.searchProducts(q, pageIndex, TAKE)
                : await Products.getProducts(pageIndex, TAKE)
            setProducts(data.products)
            setTotal(data.total)
        } catch {
            setProducts([])
            setTotal(0)
        } finally {
            setLoading(false)
        }
    }

    const goToPage = (pageIndex: number) => {
        const next = new URLSearchParams(searchParams)
        next.set('page', String(pageIndex))
        setSearchParams(next, { replace: true })
    }

    const nextPage = () => goToPage(pageFromUrl + 1)
    const prevPage = () => goToPage(pageFromUrl - 1)

    const totalPages = Math.ceil(total / TAKE)
    const currentPage = pageFromUrl

    return {
        products,
        loading,
        query,
        fetch,
        goToPage,
        nextPage,
        prevPage,
        currentPage,
        totalPages,
    }
}