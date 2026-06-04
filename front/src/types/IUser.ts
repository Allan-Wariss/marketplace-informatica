import type { IProduct } from './IProduct';
import type { IPedido } from './IPedido';
import type { ICarrinho } from './ICarrinho';

export interface IUser {
  id: string;
  email: string;
  name: string;
  telefone?: string | null;
  produtos?: IProduct[];
  pedidos?: IPedido[];
  carrinho?: ICarrinho | null;
}
