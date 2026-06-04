import { useState } from "react"
import type { IProduct } from "../types/IProduct"
import Products from "../api/products/api"

export const useProducts = () =>{

    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const get = async () => {
        setLoading(true)
        try {
            const data = await Products.getProducts()
            setProducts(data)
        } catch (error) {
            console.log("Nao foi possivel pegar deu um erro ai kakakakakaka")
        }
        finally{
            setLoading(false)
        }
    }

    return{
        products,
        loading,
        get
    }

}