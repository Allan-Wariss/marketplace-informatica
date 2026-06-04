import { useCadastrarProduto } from '../../hooks/useCadastrarProduto'
import { Header } from '../../components/Header'
import './cadastrar-produto.css'

export const CadastrarProduto = () => {
    const {
        form,
        categorias,
        previewImagem,
        loading,
        loadingCategorias,
        error,
        fileInputRef,
        handleChange,
        handleImagemChange,
        handleRemoverImagem,
        handleSubmit,
    } = useCadastrarProduto()

    return (
        <>
            <Header />
            <div className="cp-page">
                <div className="cp-card">
                    <h1 className="cp-card__title">Cadastrar Produto</h1>
                    <p className="cp-card__subtitle">Preencha as informações do produto</p>

                    {error && (
                        <div className="cp-alert cp-alert--erro">{error}</div>
                    )}

                    <form className="cp-form" onSubmit={handleSubmit} noValidate>
                        <div className="cp-form__field">
                            <label className="cp-form__label" htmlFor="titulo">Título</label>
                            <input
                                className="cp-form__input"
                                id="titulo"
                                name="titulo"
                                type="text"
                                placeholder="Ex: Notebook Dell Inspiron"
                                value={form.titulo}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="cp-form__field">
                            <label className="cp-form__label" htmlFor="descricao">Descrição</label>
                            <textarea
                                className="cp-form__input cp-form__textarea"
                                id="descricao"
                                name="descricao"
                                placeholder="Descreva o produto..."
                                value={form.descricao}
                                onChange={handleChange}
                                rows={4}
                                required
                            />
                        </div>

                        <div className="cp-form__row">
                            <div className="cp-form__field">
                                <label className="cp-form__label" htmlFor="preco">Preço (R$)</label>
                                <input
                                    className="cp-form__input"
                                    id="preco"
                                    name="preco"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0,00"
                                    value={form.preco === 0 ? '' : form.preco}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="cp-form__field">
                                <label className="cp-form__label" htmlFor="categoria_id">Categoria</label>
                                <select
                                    className="cp-form__input cp-form__select"
                                    id="categoria_id"
                                    name="categoria_id"
                                    value={form.categoria_id}
                                    onChange={handleChange}
                                    required
                                    disabled={loadingCategorias}
                                >
                                    <option value="">
                                        {loadingCategorias ? 'Carregando...' : 'Selecione uma categoria'}
                                    </option>
                                    {categorias.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="cp-form__field">
                            <label className="cp-form__label">
                                Imagem <span className="cp-form__optional">(opcional)</span>
                            </label>

                            {previewImagem ? (
                                <div className="cp-imagem-preview">
                                    <img
                                        className="cp-imagem-preview__img"
                                        src={previewImagem}
                                        alt="Preview do produto"
                                    />
                                    <button
                                        type="button"
                                        className="cp-imagem-preview__remover"
                                        onClick={handleRemoverImagem}
                                    >
                                        Remover imagem
                                    </button>
                                </div>
                            ) : (
                                <label className="cp-imagem-upload" htmlFor="imagem">
                                    <span className="cp-imagem-upload__icon">📷</span>
                                    <span className="cp-imagem-upload__texto">
                                        Clique para selecionar uma imagem
                                    </span>
                                    <span className="cp-imagem-upload__hint">PNG, JPG ou WEBP</span>
                                    <input
                                        id="imagem"
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        className="cp-imagem-upload__input"
                                        ref={fileInputRef}
                                        onChange={handleImagemChange}
                                    />
                                </label>
                            )}
                        </div>

                        <button
                            className="cp-form__submit"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Cadastrando...' : 'Cadastrar Produto'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
