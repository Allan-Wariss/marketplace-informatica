import type { ICarrinho } from './ICarrinho';
import type { IProduct } from './IProduct';

export interface ICarrinhoItem {
  id: string;
  carrinho_id: string;
  produto_id: string;
  quantidade: number;
  carrinho?: ICarrinho;
  produto?: IProduct;
}
