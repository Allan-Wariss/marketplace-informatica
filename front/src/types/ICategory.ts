import type { IProduct } from './IProduct';

export interface ICategory {
  id: string;
  nome: string;
  totais_vendas: number;
  produtos?: IProduct[];
}
