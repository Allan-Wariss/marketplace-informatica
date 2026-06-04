import { Link } from 'react-router-dom'
import { Header } from '../../components/Header'
import { useProduto } from '../../hooks/useProduto'
import { formatPrice } from '../../utils/formatPrice'
import './produto.css'

export const Produto = () => {
    const { product, loading, error, adicionarAoCarrinho, comprar } = useProduto()

    return (
        <>
            <Header />
            <div className="produto-page">
                {loading && (
                    <div className="produto-page__loading">Carregando produto...</div>
                )}

                {error && (
                    <div className="produto-page__error">
                        <p>{error}</p>
                        <Link to="/home" className="produto-page__back-link">Voltar para a loja</Link>
                    </div>
                )}

                {!loading && !error && product && (
                    <div className="produto-layout">
                        <div className="produto-imagem">
                            {product.imagem ? (
                                <img
                                    className="produto-imagem__img"
                                    src={product.imagem}
                                    alt={product.titulo}
                                />
                            ) : (
                                <div className="produto-imagem__placeholder">
                                    <div className="produto-imagem__icon" aria-hidden="true" />
                                    <span>Sem imagem</span>
                                </div>
                            )}
                        </div>

                        <div className="produto-info">
                            <span className="produto-info__categoria">{product.categoria?.nome}</span>
                            <h1 className="produto-info__titulo">{product.titulo}</h1>
                            <p className="produto-info__vendedor">Vendido por <strong>{product.vendedor?.name}</strong></p>

                            <p className="produto-info__preco">{formatPrice(product.preco)}</p>

                            <div className="produto-info__acoes">
                                <button
                                    className="produto-btn produto-btn--carrinho"
                                    onClick={adicionarAoCarrinho}
                                    disabled={!product.disponivel}
                                >
                                    Adicionar ao Carrinho
                                </button>
                                <button
                                    className="produto-btn produto-btn--comprar"
                                    onClick={comprar}
                                    disabled={!product.disponivel}
                                >
                                    Comprar Agora
                                </button>
                            </div>

                            {!product.disponivel && (
                                <p className="produto-info__indisponivel">Produto indisponível no momento.</p>
                            )}

                            <div className="produto-info__descricao-bloco">
                                <h2 className="produto-info__descricao-titulo">Descrição</h2>
                                <p className="produto-info__descricao">{product.descricao}</p>
                            </div>

                            <Link to="/home" className="produto-page__back-link">← Voltar para a loja</Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
