import { useState } from "react"
import type { IProduct } from "../types/IProduct"
import Products from "../api/products/api"

const TAKE = 12

export const useProducts = () => {

    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)

    const get = async (skip = 0) => {
        setLoading(true)
        try {
            const data = await Products.getProducts(skip, TAKE)
            setProducts(data.products)
            setTotal(data.total)
            setPage(skip)
        } catch (error) {
            console.log("Nao foi possivel pegar deu um erro ai kakakakakaka")
        } finally {
            setLoading(false)
        }
    }

    const goToPage = (pageIndex: number) => {
        get(pageIndex)
    }

    const nextPage = () => {
        get(page + 1)
    }

    const prevPage = () => {
        get(page - 1)
    }

    const totalPages = Math.ceil(total / TAKE)
    const currentPage = page

    return {
        products,
        loading,
        get,
        goToPage,
        nextPage,
        prevPage,
        currentPage,
        totalPages,
    }
}