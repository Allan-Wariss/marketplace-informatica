import type { IProduct } from '../../types/IProduct'
import { formatPrice } from '../../utils/formatPrice'
import { limitText } from '../../utils/limitText'
import './ProductCard.css'

interface Props {
    product: IProduct
}

export const ProductCard = ({ product }: Props) => (
    <div className="product-card">
        <h1 className="product-card__titulo">{product.titulo}</h1>

        {product.imagem ? (
            <img
                className="product-card__image"
                src={product.imagem}
                alt={product.titulo}
            />
        ) : (
            <div className="product-card__image-placeholder">
                <div className="product-card__image-icon" aria-hidden="true" />
                <span className="product-card__image-text">Imagem do produto</span>
            </div>
        )}

        <p className="product-card__descricao">{limitText(product.descricao, 22)}</p>
        <p className="product-card__categoria">{product.categoria?.nome}</p>
        <p className="product-card__vendedor">Vendedor: {product.vendedor?.name ?? ''}</p>
        <p className="product-card__preco">{formatPrice(product.preco)}</p>
    </div>
)
