import type { IUser } from './IUser';
import type { ICarrinhoItem } from './ICarrinhoItem';
import type { IPedido } from './IPedido';

export interface ICarrinho {
  id: string;
  usuario_id: string;
  valor_total: number;
  usuario?: IUser;
  itens?: ICarrinhoItem[];
  pedido?: IPedido | null;
}
