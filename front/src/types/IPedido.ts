import type { IUser } from './IUser';
import type { ICarrinho } from './ICarrinho';

export interface IPedido {
  id: string;
  comprador_id: string;
  carrinho_id: string;
  finalizado: boolean;
  data_compra: string;
  valor_total: number;
  comprador?: IUser;
  carrinho?: ICarrinho;
}
