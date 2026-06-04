import type { IProduct } from './IProduct'

export interface IHistoricoItem {
  id: string
  carrinho_id: string
  produto_id: string
  quantidade: number
  produto: IProduct
}

export interface IHistoricoCarrinho {
  id: string
  valor_total: number
  itens: IHistoricoItem[]
}

export interface IHistorico {
  id: string
  comprador_id: string
  carrinho_id: string
  finalizado: boolean
  data_compra: string
  valor_total: number
  carrinho: IHistoricoCarrinho
}
