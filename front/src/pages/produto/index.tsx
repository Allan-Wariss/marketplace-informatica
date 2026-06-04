import { Link } from 'react-router-dom'
import { Header } from '../../components/Header'
import { useProduto } from '../../hooks/useProduto'
import { formatPrice } from '../../utils/formatPrice'
import './produto.css'

export const Produto = () => {
    const {
        product,
        loading,
        error,
        isOwner,
        editando,
        setEditando,
        editForm,
        loadingEdit,
        fileInputRef,
        handleEditChange,
        handleEditImagemChange,
        handleEditSubmit,
        confirmandoDelete,
        setConfirmandoDelete,
        loadingDelete,
        handleDelete,
        loadingCarrinho,
        loadingCompra,
        confirmandoCompra,
        setConfirmandoCompra,
        adicionarAoCarrinho,
        comprar,
        confirmarCompra,
    } = useProduto()

    return (
        <>
            <Header />
            <div className="produto-page">
                {loading && <div className="produto-page__loading">Carregando produto...</div>}

                {error && (
                    <div className="produto-page__error">
                        <p>{error}</p>
                        <Link to="/home" className="produto-page__back-link">Voltar para a loja</Link>
                    </div>
                )}

                {!loading && !error && product && (
                    <>

                        {isOwner && !editando && (
                            <div className="produto-owner-bar">
                                <span className="produto-owner-bar__label">Este produto é seu</span>
                                <div className="produto-owner-bar__acoes">
                                    <button
                                        className="produto-owner-btn produto-owner-btn--editar"
                                        onClick={() => setEditando(true)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="produto-owner-btn produto-owner-btn--deletar"
                                        onClick={() => setConfirmandoDelete(true)}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        )}

                        {confirmandoDelete && (
                            <div className="produto-modal-overlay">
                                <div className="produto-modal">
                                    <h3 className="produto-modal__titulo">Excluir produto?</h3>
                                    <p className="produto-modal__texto">
                                        Essa ação não pode ser desfeita. O produto <strong>{product.titulo}</strong> será removido permanentemente.
                                    </p>
                                    <div className="produto-modal__acoes">
                                        <button
                                            className="produto-owner-btn produto-owner-btn--cancelar"
                                            onClick={() => setConfirmandoDelete(false)}
                                            disabled={loadingDelete}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            className="produto-owner-btn produto-owner-btn--deletar"
                                            onClick={handleDelete}
                                            disabled={loadingDelete}
                                        >
                                            {loadingDelete ? 'Excluindo...' : 'Confirmar exclusão'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isOwner && editando ? (
                            <form className="produto-edit-form" onSubmit={handleEditSubmit} noValidate>
                                <div className="produto-edit-form__header">
                                    <h2 className="produto-edit-form__titulo">Editar Produto</h2>
                                    <button
                                        type="button"
                                        className="produto-owner-btn produto-owner-btn--cancelar"
                                        onClick={() => setEditando(false)}
                                    >
                                        Cancelar
                                    </button>
                                </div>

                                <div className="produto-edit-form__field">
                                    <label className="produto-edit-form__label">Título</label>
                                    <input
                                        className="produto-edit-form__input"
                                        name="titulo"
                                        value={editForm.titulo ?? ''}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>

                                <div className="produto-edit-form__field">
                                    <label className="produto-edit-form__label">Descrição</label>
                                    <textarea
                                        className="produto-edit-form__input produto-edit-form__textarea"
                                        name="descricao"
                                        value={editForm.descricao ?? ''}
                                        onChange={handleEditChange}
                                        rows={5}
                                        required
                                    />
                                </div>

                                <div className="produto-edit-form__field">
                                    <label className="produto-edit-form__label">Preço (R$)</label>
                                    <input
                                        className="produto-edit-form__input"
                                        name="preco"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={editForm.preco ?? ''}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>

                                <div className="produto-edit-form__field">
                                    <label className="produto-edit-form__label">
                                        Nova imagem <span className="produto-edit-form__opcional">(opcional)</span>
                                    </label>
                                    {editForm.imagem && (
                                        <img
                                            className="produto-edit-form__preview"
                                            src={editForm.imagem}
                                            alt="Preview"
                                        />
                                    )}
                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        className="produto-edit-form__file"
                                        ref={fileInputRef}
                                        onChange={handleEditImagemChange}
                                    />
                                </div>

                                <button
                                    className="produto-owner-btn produto-owner-btn--salvar"
                                    type="submit"
                                    disabled={loadingEdit}
                                >
                                    {loadingEdit ? 'Salvando...' : 'Salvar alterações'}
                                </button>
                            </form>
                        ) : (
                            <div className="produto-layout">
                                <div className="produto-imagem">
                                    {product.imagem ? (
                                        <img className="produto-imagem__img" src={product.imagem} alt={product.titulo} />
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
                                    <p className="produto-info__vendedor">Contato: <strong>{product.vendedor?.telefone}</strong></p>
                                    <p className="produto-info__preco">{formatPrice(product.preco)}</p>

                                    {!isOwner && (
                                        <div className="produto-info__acoes">
                                            <button
                                                className="produto-btn produto-btn--carrinho"
                                                onClick={adicionarAoCarrinho}
                                                disabled={!product.disponivel || loadingCarrinho}
                                            >
                                                {loadingCarrinho ? 'Adicionando...' : 'Adicionar ao Carrinho'}
                                            </button>
                                            <button
                                                className="produto-btn produto-btn--comprar"
                                                onClick={comprar}
                                                disabled={!product.disponivel || loadingCompra}
                                            >
                                                {!product.disponivel ? 'Indisponível' : 'Comprar Agora'}
                                            </button>
                                        </div>
                                    )}

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
                    </>
                )}

                {/* Modal de confirmação de compra direta */}
                {confirmandoCompra && product && (
                    <div className="produto-modal-overlay">
                        <div className="produto-modal">
                            <h3 className="produto-modal__titulo">Confirmar compra?</h3>
                            <p className="produto-modal__texto">
                                Você está comprando <strong>{product.titulo}</strong> por{' '}
                                <strong>{formatPrice(product.preco)}</strong>.
                            </p>
                            <div className="produto-modal__acoes">
                                <button
                                    className="produto-owner-btn produto-owner-btn--cancelar"
                                    onClick={() => setConfirmandoCompra(false)}
                                    disabled={loadingCompra}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="produto-owner-btn produto-owner-btn--salvar"
                                    onClick={confirmarCompra}
                                    disabled={loadingCompra}
                                >
                                    {loadingCompra ? 'Processando...' : 'Confirmar compra'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
