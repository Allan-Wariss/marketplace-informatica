import type { IProduct } from "../../types/IProduct";
import api from "../axios/api";

class Products {
    async getProducts () {
        const response = await api.get<IProduct[]>("/product")
        return response.data;
    }
}

export default new Products();