import type { IUser } from './IUser';
import type { ICategory } from './ICategory';
import type { ICarrinhoItem } from './ICarrinhoItem';

export interface IProduct {
  id: string;
  vendedor_id: string;
  categoria_id: string;
  titulo: string;
  descricao: string;
  preco: number;
  disponivel: boolean;
  imagem?: string | null;
  vendedor?: IUser;
  categoria?: ICategory;
  carrinhoItens?: ICarrinhoItem[];
}

