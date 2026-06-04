import { useEffect } from "react"
import { useProducts } from "../../hooks/useProducts"
import { ProductCard } from "../ProductCard"
import "./ListProducts.css"

const pageNumbers = (total: number) => Array.from({ length: total }, (_, index) => index)

export const ListProducts = () => {
    const { fetch, loading, products, query, currentPage, totalPages, goToPage, nextPage, prevPage } = useProducts()

    useEffect(() => {
        fetch(query, currentPage)
    }, [query, currentPage])

    const isFirstPage = currentPage === 0
    const isLastPage = currentPage === totalPages - 1

    return (
        <>
            {query && (
                <p className="list-products__search-label">
                    Resultados para: <strong>"{query}"</strong>
                </p>
            )}

            <div className="list-products">
                {loading && (
                    <div className="list-products__loading">Carregando...</div>
                )}

                {!loading && products.length === 0 && (
                    <div className="list-products__empty">Nenhum produto encontrado.</div>
                )}

                {!loading && products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {totalPages > 1 && (
                <nav className="pagination">
                    <button className="pagination__btn" onClick={prevPage} disabled={isFirstPage}>
                        &lsaquo;
                    </button>

                    {pageNumbers(totalPages).map((pageIndex) => (
                        <button
                            key={pageIndex}
                            className={`pagination__btn ${pageIndex === currentPage ? 'pagination__btn--active' : ''}`}
                            onClick={() => goToPage(pageIndex)}
                        >
                            {pageIndex + 1}
                        </button>
                    ))}

                    <button className="pagination__btn" onClick={nextPage} disabled={isLastPage}>
                        &rsaquo;
                    </button>
                </nav>
            )}
        </>
    )
}
