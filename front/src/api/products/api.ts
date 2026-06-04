import type { ICreateProductForm, IProduct, IProductPage } from "../../types/IProduct";
import api from "../axios/api";

class Products {
    async getProducts(skip: number, take: number): Promise<IProductPage> {
        const response = await api.get<IProductPage>("/product", { params: { skip, take } })
        return response.data;
    }

    async searchProducts(titulo: string, skip: number, take: number): Promise<IProductPage> {
        const response = await api.get<IProductPage>("/product/search", { params: { titulo, skip, take } })
        return response.data;
    }

    async getProductById(id: string): Promise<IProduct> {
        const response = await api.get<IProduct>(`/product/${id}`)
        return response.data
    }

    async createProduct(payload: ICreateProductForm): Promise<IProduct> {
        const response = await api.post<IProduct>('/product', payload)
        return response.data
    }

    async updateProduct(id: string, payload: Partial<ICreateProductForm>): Promise<IProduct> {
        const response = await api.patch<IProduct>(`/product/${id}`, payload)
        return response.data
    }

    async deleteProduct(id: string): Promise<void> {
        await api.delete(`/product/${id}`)
    }
}

export default new Products();