import type { ICreateProductForm, IProduct, IProductPage } from "../../types/IProduct";
import api from "../axios/api";

class Products {
    async getProducts(skip: number, take: number): Promise<IProductPage> {
        const response = await api.get<IProductPage>("/product", { params: { skip, take } })
        return response.data;
    }

    async createProduct(payload: ICreateProductForm): Promise<IProduct> {
        const response = await api.post<IProduct>('/product', payload)
        return response.data
    }
}

export default new Products();