import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../../components/Header'
import { useCarrinho } from '../../hooks/useCarrinho'
import { formatPrice } from '../../utils/formatPrice'
import './carrinho.css'

export const Carrinho = () => {
    const {
        loading,
        loadingFinalizando,
        confirmandoCompra,
        setConfirmandoCompra,
        itens,
        valorTotal,
        historico,
        loadingHistorico,
        carregarCarrinho,
        carregarHistorico,
        removerItem,
        finalizarCompra,
    } = useCarrinho()

    useEffect(() => {
        carregarCarrinho()
        carregarHistorico()
    }, [])

    return (
        <>
            <Header />
            <div className="carrinho-page">
                <h1 className="carrinho-page__titulo">Meu Carrinho</h1>

                {loading && <p className="carrinho-page__estado">Carregando...</p>}

                {!loading && itens.length === 0 && (
                    <div className="carrinho-page__vazio">
                        <p>Seu carrinho está vazio.</p>
                        <Link to="/home" className="carrinho-page__link">Ver produtos</Link>
                    </div>
                )}

                {!loading && itens.length > 0 && (
                    <div className="carrinho-layout">
                        <div className="carrinho-itens">
                            {itens.map((item) => (
                                <div key={item.id} className="carrinho-item">
                                    {item.produto?.imagem ? (
                                        <img
                                            className="carrinho-item__img"
                                            src={item.produto.imagem}
                                            alt={item.produto.titulo}
                                        />
                                    ) : (
                                        <div className="carrinho-item__img-placeholder" />
                                    )}

                                    <div className="carrinho-item__info">
                                        <Link
                                            to={`/produto/${item.produto_id}`}
                                            className="carrinho-item__titulo"
                                        >
                                            {item.produto?.titulo}
                                        </Link>
                                        <p className="carrinho-item__preco">
                                            {formatPrice(Number(item.produto?.preco ?? 0))}
                                        </p>
                                        {!item.produto?.disponivel && (
                                            <span className="carrinho-item__indisponivel">Indisponível</span>
                                        )}
                                    </div>

                                    <div className="carrinho-item__quantidade">
                                        <span className="carrinho-item__qty-valor">Qtd: 1</span>
                                    </div>

                                    <p className="carrinho-item__subtotal">
                                        {formatPrice(Number(item.produto?.preco ?? 0) * item.quantidade)}
                                    </p>

                                    <button
                                        className="carrinho-item__remover"
                                        onClick={() => removerItem(item.id)}
                                        title="Remover item"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="carrinho-resumo">
                            <h2 className="carrinho-resumo__titulo">Resumo</h2>
                            <div className="carrinho-resumo__linha">
                                <span>Subtotal</span>
                                <strong>{formatPrice(valorTotal)}</strong>
                            </div>
                            <button
                                className="carrinho-resumo__btn"
                                onClick={() => setConfirmandoCompra(true)}
                            >
                                Finalizar Compra
                            </button>
                            <Link to="/home" className="carrinho-resumo__continuar">
                                ← Continuar comprando
                            </Link>
                        </div>
                    </div>
                )}

                {/* Modal de confirmação */}
                {confirmandoCompra && (
                    <div className="carrinho-modal-overlay">
                        <div className="carrinho-modal">
                            <h3 className="carrinho-modal__titulo">Confirmar pedido?</h3>
                            <p className="carrinho-modal__texto">
                                Total: <strong>{formatPrice(valorTotal)}</strong>
                            </p>
                            <div className="carrinho-modal__acoes">
                                <button
                                    className="carrinho-modal__btn carrinho-modal__btn--cancelar"
                                    onClick={() => setConfirmandoCompra(false)}
                                    disabled={loadingFinalizando}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="carrinho-modal__btn carrinho-modal__btn--confirmar"
                                    onClick={finalizarCompra}
                                    disabled={loadingFinalizando}
                                >
                                    {loadingFinalizando ? 'Processando...' : 'Confirmar compra'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <section className="historico">
                    <h2 className="historico__titulo">Histórico de Compras</h2>

                    {loadingHistorico && <p className="historico__estado">Carregando histórico...</p>}

                    {!loadingHistorico && historico.length === 0 && (
                        <p className="historico__vazio">Você ainda não realizou nenhuma compra.</p>
                    )}

                    {!loadingHistorico && historico.map((pedido) => (
                        <div key={pedido.id} className="historico-pedido">
                            <div className="historico-pedido__header">
                                <div className="historico-pedido__meta">
                                    <span className="historico-pedido__data">
                                        {new Date(pedido.data_compra).toLocaleDateString('pt-BR', {
                                            day: '2-digit', month: 'long', year: 'numeric',
                                            hour: '2-digit', minute: '2-digit',
                                        })}
                                    </span>
                                    <span className="historico-pedido__id">#{pedido.id.slice(0, 8).toUpperCase()}</span>
                                </div>
                                <span className="historico-pedido__total">
                                    {formatPrice(Number(pedido.valor_total))}
                                </span>
                            </div>

                            <div className="historico-pedido__itens">
                                {pedido.carrinho.itens.map((item) => (
                                    <div key={item.id} className="historico-item">
                                        {item.produto?.imagem ? (
                                            <img
                                                className="historico-item__img"
                                                src={item.produto.imagem}
                                                alt={item.produto.titulo}
                                            />
                                        ) : (
                                            <div className="historico-item__img-placeholder" />
                                        )}
                                        <div className="historico-item__info">
                                            <Link
                                                to={`/produto/${item.produto_id}`}
                                                className="historico-item__titulo"
                                            >
                                                {item.produto?.titulo}
                                            </Link>
                                            {item.produto?.categoria && (
                                                <span className="historico-item__categoria">
                                                    {item.produto.categoria.nome}
                                                </span>
                                            )}
                                            {item.produto?.vendedor && (
                                                <span className="historico-item__vendedor">
                                                    Vendedor: {item.produto.vendedor.name}
                                                </span>
                                            )}
                                            <span className="historico-item__qtd">
                                                Qtd: {item.quantidade}
                                            </span>
                                        </div>
                                        <span className="historico-item__preco">
                                            {formatPrice(Number(item.produto?.preco ?? 0) * item.quantidade)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </>
    )
}
