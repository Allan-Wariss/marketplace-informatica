import type { IProduct } from './IProduct';

export interface ICategory {
  id: string;
  nome: string;
  produtos?: IProduct[];
}
