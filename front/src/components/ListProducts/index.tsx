import { useEffect } from "react"
import { useProducts } from "../../hooks/useProducts"
import { formatPrice } from "../../utils/formatPrice"
import { limitText } from "../../utils/limitText"
import "./ListProducts.css"

export const ListProducts = () => {
    const { get, loading, products, currentPage, totalPages, goToPage, nextPage, prevPage } = useProducts()

    useEffect(() => {
        get(0)
    }, [])

    return (
        <>
            <div className="list-products">
                {loading ? (
                    <div className="list-products__loading">Carregando...</div>
                ) : (
                    products?.map((product) => (
                        <div key={product.id} className="product-card">
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
                            <p className="product-card__disponivel">{product.disponivel}</p>
                            <p className="product-card__vendedor"> Vendedor: {product?.vendedor?.name || ""}</p>
                            <p className="product-card__preco">{formatPrice(product.preco)}</p>
                        </div>
                    ))
                )}
            </div>

            {totalPages > 1 && (
                <nav className="pagination">
                    <button
                        className="pagination__btn"
                        onClick={prevPage}
                        disabled={currentPage === 0}
                    >
                        &lsaquo;
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            className={`pagination__btn ${i === currentPage ? 'pagination__btn--active' : ''}`}
                            onClick={() => goToPage(i)}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        className="pagination__btn"
                        onClick={nextPage}
                        disabled={currentPage === totalPages - 1}
                    >
                        &rsaquo;
                    </button>
                </nav>
            )}
        </>
    )

}